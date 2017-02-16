import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Table,Card,Icon} from "antd";


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class NotificationPanel extends React.Component { 

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

  render() {

      const columns =[
      {
        title: '课程状态',
        dataIndex: 'status',
        key: 'status',
        render:(text,record)=>{
          if(text=="inprocess")
            return "审核中"
          else if(text == "non")
            return "未开始"
        }
      },
      {
        title: '课程名字',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: '课程类型',
        dataIndex: 'category',
        key: 'category',
      },{
        title: '申请人',
        dataIndex: 'username',
        key: 'username',
      },
      { 
        title: '操作' , key: 'action', 
        render: (text,record) =>{ 
        <span>
      <a href="#">通过</a>
      <span className="ant-divider" />
          <a href="#">拒绝</a>
        </span>
                              }
      }
      ];
      const data = [
      {
        status:"inprocess",
        title:"FTD第一课",
        category:"课程",
        username:"CB"
      }];





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