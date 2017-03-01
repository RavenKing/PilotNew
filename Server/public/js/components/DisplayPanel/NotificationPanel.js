import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay,FetchMessage,UpdateMessage,UpdateMessage1} from "../../Actions/pilotAction"
import {Table,Card,Icon} from "antd";


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class NotificationPanel extends React.Component { 

    componentWillMount(){
      this.props.dispatch(FetchMessage());

    } 

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

    WorkFlowDetail(e){
      console.log(e.target.rel)
      console.log("workflow detail view")
      var data = {
        type:"workflowdetail",
        workflowid:e.target.rel,
        cardid:Math.random()*10000000
      }
      this.props.dispatch(AddCardToDisplay(data))

    }

  RemoveCard()
  {
    console.log(this.props.cardid)
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }

  Agree(e)
  {
    if(this.props.pilotinfo.Pilot.role == "INS")
    {
    const messageId = e.target.rel;
    const newMessage = {
      message_id:messageId,
      owner:"005",
    }
    this.props.dispatch(UpdateMessage(newMessage))
    }
    if(this.props.pilotinfo.Pilot.role == "AUD")
    {
      const messageId = e.target.rel;
      const newMessage = {
      message_id:messageId,
      status:"fin",
    }
    this.props.dispatch(UpdateMessage1(newMessage))
    }
  }

  Disagree(e)
  {
    const messageId = e.target.rel;
    const messages = this.props.pilotinfo.message;
    const chosenmessage =  messages.filter((message,i)=>{
      if(message.message_id == messageId)
        return message.applier;
    });
    const applier = chosenmessage[0].applierId;
    const newMessage = {
      message_id:messageId,
      owner:applier,
    }
    this.props.dispatch(UpdateMessage(newMessage))
    const newMessage1 = {
      message_id:messageId,
      status:"rej"
    }
    this.props.dispatch(UpdateMessage1(newMessage1))
  }

  render() {

      const columns =[
      {
        title: '课程状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record)=>{
          if(text=="inprocess")
            return "审核中"
          else if(text == "fin")
            return "审核通过"
          else if(text == "rej")
            return "审核被拒绝"
        }
      },
      {
        title:"消息编号",
        dataIndex:'message_id',
        key:'message_id'
      },
      {
        title: ' 流程名称',
        dataIndex: 'workflowid',
        key: 'workflowid',
      }, {
        title: '课程类型',
        dataIndex: 'category',
        key: 'category',
      },{
        title: '申请人',
        dataIndex: 'applier',
        key: 'applier',
      },
      { 
        title: '操作' , key: 'action', 
        render: (text,record) =>{
          if(this.props.pilotinfo.Pilot.role == "Pilot")
            return "";
          else
            return(
        <span>
      <a href="#" onClick={this.Agree.bind(this)} rel={record.message_id} >通过|</a>
      <a href="#" onClick={this.Disagree.bind(this)}rel={record.message_id} > 拒绝</a>
      <span className="ant-divider" />
    </span>
    )},
      }];

      const messages = this.props.pilotinfo.message;
      console.log("messages are",messages);
      console.log("props are",this.props);
      const mineMessages = messages.filter((message,i)=>{
        if(message.owner == this.props.pilotinfo.Pilot.cert_id)
          return message;
        if(message.applier == this.props.pilotinfo.Pilot.name)
          return message;
      })

      const data = mineMessages;
        return (
        <div className="detail-panel">  
        <Card title="通知列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>处理的请求</h1>
        <Table columns={columns} dataSource={data}  />
        </Card>
        </div>
      );
  }

}