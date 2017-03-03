import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";

import {RemoveCard,AddCardToDisplay,SubmitMessage} from "../../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal,Popconfirm,notification } from "antd";
import {GetAllDocuments,updateDocumentXiaWen,UpdateLevel,UPDATE_PILOT_DATA_LEVEL} from "../../../Actions/QueryAction";
import XiaWenModal from "./XiaWenModal";
import moment from 'moment';

@connect((store)=>{    
    return {
        pilot:store.pilotinfo,
        query:store.query
    };
    
})
export default class XiaWenPanel extends React.Component { 
  constructor(props)
  {
      super(props)
                //table colume config 
          const columns = [{
            title: '飞行员证件号',
            dataIndex: 'cert_id',
            key: 'cert_id',
          }, {
            title: '流程名',
            dataIndex: 'title',
            key: 'title',
          }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: '下文名称',
            dataIndex: 'xiawen_name',
            key: 'xiawen_name',
          },
          {
            title: '下文时间',
            dataIndex: 'xiawen_date',
            key: 'xiawen_date',
          }, 
           { 
          title: '操作', dataIndex: '', key: 'x', render: (key,record) =>{
                  if(record.status=='已完成')
                  return (<span>
                  <a onClick={this.AddXiaWen.bind(this,record)}>添加下文</a>
                  </span>)
                else if(record.status == '进行中')
                {
                  return (<span><a>尚未完成</a></span> )
                }
                 }  
                }
          ];
          const {query} =this.props;
          var lists = query.AllDocuments;
          console.log("lists are",lists);
          for(let i = 0;i<lists.length;i++)
          {
            let j = 0;
            if (lists[i].status == "已完成")
            {
              var temp = lists[j];
              lists[j] = lists[i];
              lists[i] = temp;
            }
            j++;
          }
        this.state={ 
        columns:columns,
        visible:false,
        editdata:null,
        list:lists
      }
  }

AddXiaWen(record){

  // this.setState({visible:true,
  //                  target:record
  //                 })
  const message = {
    workflowid:record.workflow_id,
    description:"恭喜您完成训练，下文已经完成",
    owner:record.cert_id
  }
  this.props.dispatch(SubmitMessage(message));
  console.log("record is",record);

}
  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }
  componentDidMount() {
          setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   
        }

saveFormRef(form){this.form = form;}

onCreate()
{
 const form = this.form;
 form.validateFields((err, values) => {
    let xiawenname = form.getFieldValue("xiawen_name");
    let xiawendate = form.getFieldValue("xiawen_date");
    this.state.target.xiawen_name=xiawenname;
    this.state.target.xiawen_date=xiawendate.format('YYYY-MM-DD');
    this.props.dispatch(updateDocumentXiaWen(this.state.target));
    this.props.dispatch(UPDATE_PILOT_DATA_LEVEL(this.state.target.cert_id,
      {level:{current_level:this.state.target.target_level}}));


    notification['success']({
      message: '完成',
    description: '身份证为：'+this.state.target.cert_id+'已经升级为'+this.state.target.target_level,
})
    this.setState({visible:false,target:null})
    form.resetFields();
    });
}
onCancel()
{
  this.setState({visible:false})
}
  render() {
        return (
        <div className="detail-panel">  
        <Card title="申请状态列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>申请状态列表</h1>
         <Table columns={this.state.columns} dataSource={this.state.list}  />
        </Card>

        <XiaWenModal 
        visible={this.state.visible}
        onCreate={this.onCreate.bind(this)}
        onCancel={this.onCancel.bind(this)}
                  ref={this.saveFormRef.bind(this)}

        >
        </XiaWenModal>

        </div>
      );
  }

}