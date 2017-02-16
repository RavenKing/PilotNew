import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline,Button,Checkbox,Menu,Dropdown} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify,SubmitMessage} from "../../Actions/pilotAction"

@connect((store)=>{    
    return {
    	status:status,
      pilotinfo:store.pilotinfo,
      query:store.query
    };
    
})
export default class WorkFlowDetail extends React.Component {

  componentWillMount()
  {
    const users = this.props.query.pilots;
    const inspector = users.filter((user)=>{
          if(user.role == "INS")
            return user;
        })
        this.setState({
          inspector:inspector,
          choseninspector:{name:"选择检查员"}
        });
  }

	componentDidMount(){

      const props = this.props;
      const that = this;	
      const {status} = this.props;
      var workflowid = this.props.workflowid;

      if(status.status == "init")
      setCardDragable(ReactDOM.findDOMNode(this));  

      handleFocus(ReactDOM.findDOMNode(this));   
       this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.function-button',
          ondrop: function(event) {
 		      var content = document.getElementById('content');
    	    content.classList.add('content-' + Math.floor(Math.random() * 3));		
      		//change status 
      	 	props.dispatch(ChangeToModify(workflowid));
      		//add change card

              
          }
      });
	}

  onChange()
  {
    console.log("哎呀呀，有人点我");
  }
  ChooseIns(e)
  {
    console.log("what happend, who is that?",e);
    var inspector = this.state.inspector;
    var key = e.key;
    this.setState({choseninspector:inspector[key]})
  }
	RemoveCard()
	{
		var data={

			cardid:this.props.cardid
		}
		this.props.dispatch(RemoveCard(data))
	}
  

  SubmitForIns()
  {
    var message = {
      message_id:this.props.pilotinfo.Pilot.cert_id + this.props.workflowid,
      workflowid:this.props.workflowid,
      descriptoion:"",
      applier:this.props.pilotinfo.Pilot.name,
      owner:this.state.choseninspector.cert_id,
    }
    this.props.dispatch(SubmitMessage(message));
  }
    
    render() {
        var workflowid = this.props.workflowid;
        // console.log("this.props",this.props);
        const {Workflows} =this.props.pilotinfo; 
        const targetdata = Workflows.filter((workflow)=>{
          if(workflow.workflow_id == workflowid)
          {
            return workflow;
          }
        })
        var inspector = this.state.inspector;
        console.log("pilots are",inspector);
        console.log("this.state is",this.state);
        const menu = (
    <Menu onClick={this.ChooseIns.bind(this)}>
    {inspector.map((ins,i)=>{
      return (<Menu.Item key={i}> {ins.name} </Menu.Item>)
    })}
  </Menu>
);
        var steps = targetdata[0].steps;
        var title = targetdata[0].title;
        console.log("targetdata is ",targetdata[0])
        console.log("this.props",this.props);
        // console.log(" let us see what is in steps",setps);
        return (
        <div  class="workFlowDetailPanel">  
          <Card  title={title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <Timeline>
           {
            steps.map((one,i)=>{
            return <Timeline.Item key={i}>
            { one.name }
            {one.courses.map((course,j)=>
              <div>
                 {course.title}<Icon type="download" key ={j}/> <Checkbox align ="right" onChange={this.onChange.bind(this)}></Checkbox>
              </div>
              )}
            </Timeline.Item>
            })
           }
				  </Timeline>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
            {this.state.choseninspector.name}
            <Icon type="down" />
            </a>
          </Dropdown>
          <Button type = "primary" onClick={this.SubmitForIns.bind(this)}>提交检察员</Button>
		      </Card>
        </div>
      );
  }
}

