import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline,Button,Checkbox} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify} from "../../Actions/pilotAction"

@connect((store)=>{    
    return {
    	status:status,
      pilotinfo:store.pilotinfo
    };
    
})
export default class WorkFlowDetail extends React.Component {


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

	RemoveCard()
	{
		var data={

			cardid:this.props.cardid
		}
		this.props.dispatch(RemoveCard(data))
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
        var steps = targetdata[0].steps;
        var title = targetdata[0].title;
        console.log("targetdata is ",targetdata[0])
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
          <Button type = "primary">提交检察员</Button>
		      </Card>
        </div>
      );
  }
}

