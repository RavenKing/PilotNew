import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline,Button,Checkbox,Menu,Dropdown,Modal} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify,SubmitMessage,FetchMessage,GetTargetCourse} from "../../Actions/pilotAction"

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
          choseninspector:{name:"选择检查员"},
          info:"",
          showFileList:false
        });
    this.props.dispatch(FetchMessage());
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

  onChange(one)
  {
    this.setState({info:one.name})
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
    const time = Number(new Date());
    var status = "inprocess"
    var message = {
      documentId:this.props.pilotinfo.documentId,
      message_id:this.props.pilotinfo.Pilot.cert_id + this.props.workflowid+time,
      message_key:this.props.pilotinfo.Pilot.cert_id+this.props.workflowid+status+this.state.info,
      workflowid:this.props.workflowid,
      description:this.state.info+"已提交给"+this.state.choseninspector.name,
      applier:this.props.pilotinfo.Pilot.name,
      applierId:this.props.pilotinfo.Pilot.cert_id,
      owner:this.state.choseninspector.cert_id,
      last:"false",
      action:"",
      approverName:this.state.choseninspector.name,
      approverId:this.state.choseninspector.cert_id,
      status:status
    }
    var messages = this.props.pilotinfo.message;
    var flag = true;
    messages.map((mes,i)=>
    {
      if(mes.message_key == message.message_key&&mes.status!="canceled")
      {
       if(mes.status!="rej") 
        flag = false;
      }
    })
    if(flag==true){
      if(!this.state.choseninspector.cert_id)
      {
        const modal = Modal.success({
                title: '请选择监察员',
                content: '请选择监察员',
               });
      }
      else{
       this.props.dispatch(SubmitMessage(message));
       this.props.dispatch(FetchMessage());
     }}
     else
     {
      const modal = Modal.success({
                title: '请勿重复提交',
                content: '请勿重复提交',
               });
     }
     flag = true;
  }

  /// Files modal
    showFiles(course)
    {
      console.log(course);

      // get Documents List
      this.props.dispatch(GetTargetCourse(course))
      this.setState({showFileList:true})
    }
    onClose()
    {
      this.setState({showFileList:false});
    }

    //
    render() {


        var workflowid = this.props.workflowid;
        const {courseList} = this.props.pilotinfo;
        var wenjianxiazai = <div>无</div>
       if(courseList)
                    {
                      if(courseList.loading==false)
                      {
                        const {data} = courseList;
                        if(data[0].attachments.length>0)
                        {
                          //return "文件列表"
                        wenjianxiazai=  data[0].attachments.map((url)=>{
                      return ( <div><a href={url.url}>{url.name}</a>
                              </div>
                               )
                            })
                        }
                      }

                    }

        // console.log("this.props",this.props);
        const {Workflows} =this.props.pilotinfo;
        var documents = this.props.pilotinfo.Documents;
        const targetdata = documents.filter((doc)=>{
          if(doc.documentId == this.props.documentId)
          {
            return doc;
          }
        })
        var inspector = this.state.inspector;


 
        var steps = targetdata[0].steps;
        var title = targetdata[0].title;
        // console.log(" let us see what is in steps",setps);
        let showMenu = false;
            steps.map((step)=>{
              if(step.status == "processing")
              showMenu = true
            });

let menu = <div>"所有阶段已完成，无需再次提交"</div>
            if(showMenu)
           menu = (
              <Menu onClick={this.ChooseIns.bind(this)}>
              {inspector.map((ins,i)=>{
                return (<Menu.Item key={i}> {ins.name} </Menu.Item>)
              })}
            </Menu>
          );


        return (
        <div  class="workFlowDetailPanel">  
          <Card  title={title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <Timeline>
           {
            steps.map((one,i)=>{
             if(one.status == "processing")
            {
            return (<Timeline.Item key={i}>
            { one.name }<Checkbox align ="right" onChange={this.onChange.bind(this,one)}></Checkbox>
            {one.courses.map((course,j)=>
              <div>
                 {course.title}
                  |<a href="#" onClick={this.showFiles.bind(this,course)}>文件下载
                 <Icon type="download" key ={j}/> 
                  </a>

              </div>
              )}
            </Timeline.Item>
            )
            }
            else{
              var color = "red";
              if(one.status == "fin" || one.status=="finish")
                color = "green";
              return(<Timeline.Item key={i} color={color}>
            { one.name }
            {one.courses.map((course,j)=>
              <div>
                 {course.title}|<a href="#" onClick={this.showFiles.bind(this,course)}>文件下载
                 <Icon type="download" key ={j}/> 
                  </a>

              </div>
              )}
            </Timeline.Item>
            )
            }
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
          <Modal
            visible={this.state.showFileList}
            title="文件列表"
            onCancel={this.onClose.bind(this)}
            data={courseList}
            >
            {
             wenjianxiazai
            }

      </Modal>


        </div>
      );
  }
}

