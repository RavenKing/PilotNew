import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import moment from 'moment'
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay,FetchMessage,UpdateMess,updateDocument,updateDocument1,GetDocumnts} from "../../Actions/pilotAction"
import {GetQueryResults} from "../../Actions/QueryAction";
import {Table,Card,Icon,Tag,notification} from "antd";


@connect((store)=>{    
    return {
       auth:store.auth,
        pilotinfo:store.pilotinfo,
        query:store.query
    };
    
})
export default class NotificationPanel extends React.Component { 

  constructor(props)
  {
    super(props)
    const {token} = this.props.auth;
let columns = [];
if(token.user.ROLE=="Pilot")
{
columns = [
    {   title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record)=>{
          if(text=="inprocess")
            return <Tag color="blue">审核中</Tag>
          else if(text == "fin")
            return <Tag color="green">审核通过</Tag>
          else if(text == "rej")
            return <Tag color="red">审核被拒绝</Tag>
          else if (text == "xiawen")
            return <Tag color="green">已下文</Tag>
        }
      },
      {
        title: ' 流程名称',
        dataIndex: 'workflowid',
        key: 'workflowid',
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title:'消息时间',
        dataIndex:'creationdate',
        key:'creationdate',

      }];


}
else
{  columns =[
      {
        title: '申请人',
        dataIndex: 'applier',
        key: 'applier',
      },
     {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record)=>{
          if(text=="inprocess")
            return <Tag color="blue">审核中</Tag>
          else if(text == "fin"||text=="finish")
            return <Tag color="green">审核通过</Tag>
          else if(text == "rej")
            return <Tag color="red">审核被拒绝</Tag>
          else if (text == "xiawen")
            return <Tag color="green">已下文</Tag>
        }
      },
      {
        title: ' 流程名称',
        dataIndex: 'workflowid',
        key: 'workflowid',
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title:'消息时间',
        dataIndex:'creationdate',
        key:'creationdate',

      },
      { 
        title: '操作' , key: 'action', 
        render: (text,record) =>{
          if(record.status == "rej" || record.status == "fin")
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

}
      this.state={columns:columns}
  }



    componentWillMount(){
      console.log(this.props.auth.token)
      const {token} =this.props.auth;

      if(token.user.ROLE == 'Pilot')
      {this.props.dispatch(FetchMessage(token.user.cert_id));
      }
      else
        this.props.dispatch(FetchMessage());
      this.props.dispatch(GetQueryResults("{}"));
      this.props.dispatch(GetDocumnts());
    } 

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

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
 //  console.log("targetdoc",targetdoc);
    var steps = targetdoc[0].steps;
  //  console.log("steps are,",steps);

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
          status:'fin',
          description:record.description+"已完成，请准备下一阶段",
          approveTime:Date.now()
        }

        this.props.dispatch(UpdateMess(newMessage));

 /*       this.props.dispatch(UpdateMessage(newMessage))
        this.props.dispatch(UpdateMessage2(newMessage))
 */

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
         notification["success"]({
            message: '该阶段完成',
            description: record.description+"已经完成，"+"已经通知飞行员准备下一个阶段",
          });


      }
      //不存在ready这个状态表示当前processing的状态是最后一个状态，通过则完成了
      else
      {
        console.log("aud is ",aud);
        const newMessage = {
          message_id:messageId,
          owner:aud.cert_id
        }
        
        this.props.dispatch(UpdateMess(newMessage));
        steps = steps.filter((step,i)=>{
          if(step.status == "processing")
            step.status = "finish"
          return step;
        })
        let updateDoc = targetdoc[0];
        updateDoc.steps = steps;
        console.log("doc is ",updateDoc);
        this.props.dispatch(updateDocument(updateDoc));
        notification["success"]({
            message: '阶段完成',
            description: "所有阶段已经完成"+"已经通知审核员"+aud.name+"审核",
          });
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
   this.props.dispatch(UpdateMess(newMessage));
    this.props.dispatch(updateDocument1(updateDoc))
 notification["success"]({
    message: '整个流程完成',
    description: record.applier+"已经完成整个流程"+record.workflowid+"等待管理员填写下文信息",
  });

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
      status:"rej"
    }
        this.props.dispatch(UpdateMess(newMessage));
  }

  render() {



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
    //  console.log("mineMessages are",mineMessages);
      if(mineMessages)
     { 
      for(let i = mineMessages.length-1;i>0;i--)
      { 
        for(let j = i;j>0;j--)
        {
        if(mineMessages[j].creationdate > mineMessages[j-1].creationdate)
        {
          console.log(".....++++++0-----")
          var temp = mineMessages[j];
          mineMessages[j] = mineMessages[j-1];
          mineMessages[j-1] = temp;
        }
       }
        }
      }
      const data = mineMessages;
        return (
        <div className="detail-panel">  
        <Card title="通知列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>处理的请求</h1>
        <Table columns={this.state.columns} dataSource={data}  />
        </Card>
        </div>
      );
  }

}