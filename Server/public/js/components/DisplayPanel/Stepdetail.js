import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal} from "antd";





@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class Courselist extends React.Component { 
  constructor(props)
  {
      super(props)
      this.state={
        list:null
      }
        console.log(this.props.sequence);
        const {Document} =this.props.pilotinfo;
        const {steps} =Document;
        var targetdata = steps.filter((step)=>{
        if(step.sequence==this.props.sequence)
        return step;
        })
        console.log(targetdata[0]);
        this.state={
          title:targetdata[0].name,
          list:targetdata[0].courses
        }

  }

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

OpenCourseDetail()
{}


  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }

    RemoveRow(e){
    }


    EditRow(e){
    }
////



  render() {

//table colume config 
const columns = [

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
  title: '课程编号',
  dataIndex: 'course_id',
  key: 'course_id',
  render: (text,record) => <a href="#" onClick={this.OpenCourseDetail.bind(this)} rel={record.course_id}>{text}</a>,
}, {
  title: '课程名字',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '课程类型',
  dataIndex: 'category',
  key: 'category',
}, {
  title: '描述',
  key: 'description',
  dataIndex:'description'
},
      { 
        title: '操作', dataIndex: '', key: 'x', render: (key,record) =>{ 
      
      if(record.status=="inprocess")
        return <span>等待审核结果</span>
      else if(record.status=="non" || record.status=="")
        return <a onClick={this.RemoveRow.bind(this)} rel={record.course_id}>提交申请</a>
     

      }
     }

  
];

        return (
        <div className="detail-panel">  
        <Card title= {this.state.title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>课程状态列表</h1>
         <Table columns={columns} dataSource={this.state.list}  />
        </Card>


        </div>
      );
  }

}