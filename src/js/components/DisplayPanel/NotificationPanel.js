import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay,FetchMessage,UpdateMessage,UpdateMessage1,UpdateMessage2,updateDocument,updateDocument1} from "../../Actions/pilotAction"
import {GetQueryResults} from "../../Actions/QueryAction";
import {Table,Card,Icon} from "antd";


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo,
        query:store.query
    };
    
})
export default class NotificationPanel extends React.Component { 

    componentWillMount(){
      this.props.dispatch(FetchMessage());
      this.props.dispatch(GetQueryResults("?"));
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

  Agree(record,e)
  {
    if(this.props.pilotinfo.Pilot.role == "INS")
    {
    console.log("record is",record);
    const documentId = record.documentId;
    const applierId = record.applierId;
    var documents = this.props.pilotinfo.Documents;
    const messageId = e.target.rel;
    const users = this.props.query.pilots;
    var auds = users.filter((user,i)=>{
      if(user.role =="AUD")
        return user;
    })
    var aud = auds[0];

    var targetdoc = documents.filter((doc,i)=>{
      if(doc.documentId == documentId)
        return doc;
    })
    console.log("targetdoc",targetdoc);
    var steps = targetdoc[0].steps;
    console.log("steps are,",steps);

    var flag = false;
    steps.map((step,i)=>{
      if(step.status == "ready")
      {   
        flag = true;
      }

    })
    //存在ready表示将返回到applier那里完成下一阶段的检查。
    if(flag)
    {
       const newMessage ={
          message_id:messageId,
          owner:applierId,
          description:record.description+"已完成，请准备下一阶段"
        }
        this.props.dispatch(UpdateMessage(newMessage))
        this.props.dispatch(UpdateMessage2(newMessage))
        steps = steps.filter((step,i)=>{
          if(step.status == "processing")
            step.status = "finish"
          return step;
        })
        for(var i = 0;i<steps.length;i++)
        {
          if(steps[i].status == "ready")
            {
              steps[i].status = "processing";
              break;
            }
        }
        //更新document这里
        let updateDoc = targetdoc[0];
        updateDoc.steps = steps;
        console.log("doc is ",updateDoc);
        this.props.dispatch(updateDocument(updateDoc));
      }
      //不存在ready这个状态表示当前processing的状态是最后一个状态，通过则完成了
      else
      {
        console.log("aud is ",aud);
        const newMessage = {
          message_id:messageId,
          owner:aud.cert_id
        }
        this.props.dispatch(UpdateMessage(newMessage))
        steps = steps.filter((step,i)=>{
          if(step.status == "processing")
            step.status = "finish"
          return step;
        })
        let updateDoc = targetdoc[0];
        updateDoc.steps = steps;
        console.log("doc is ",updateDoc);
        this.props.dispatch(updateDocument(updateDoc));
      }
    }
    if(this.props.pilotinfo.Pilot.role == "AUD")
    {
      const documentId = record.documentId;

      const messageId = e.target.rel;
      const newMessage = {
      message_id:messageId,
      status:"fin",
    }

    const updateDoc = {
      documentId:documentId,
      status:"已完成"
    }


    this.props.dispatch(UpdateMessage1(newMessage))
    this.props.dispatch(updateDocument1(updateDoc))
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
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },{
        title: '申请人',
        dataIndex: 'applier',
        key: 'applier',
      },
      { 
        title: '操作' , key: 'action', 
        render: (text,record) =>{
          console.log("record++++++++++++",record);
          if(this.props.pilotinfo.Pilot.role == "Pilot" || record.status == "rej" || record.status == "fin")
            return "";
          else
            return(
        <span>
      <a href="#" onClick={this.Agree.bind(this,record)} rel={record.message_id} >通过|</a>
      <a href="#" onClick={this.Disagree.bind(this)}rel={record.message_id} > 拒绝</a>
      <span className="ant-divider" />
    </span>
    )},
      }];

      const messages = this.props.pilotinfo.message;

      const mineMessages = messages.filter((message,i)=>{
        if(message.owner == this.props.pilotinfo.Pilot.cert_id)
          return message;
        if(message.applier == this.props.pilotinfo.Pilot.name)
          return message;
        if(message.status == "rej" && this.props.pilotinfo.Pilot.role == "AUD")
          return message;

      })
      for(let i = 0;i<mineMessages.length;i++)
      {
         let j = 0;
         if(mineMessages[i].status == "inprocess")
         {
            var temp = mineMessages[i];
          mineMessages[i] = mineMessages[j];
          mineMessages[j] = temp;
          j++;
          }
      }
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