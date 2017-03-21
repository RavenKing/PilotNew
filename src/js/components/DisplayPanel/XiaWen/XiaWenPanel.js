import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";

import {RemoveCard,AddCardToDisplay,SubmitMessageForXiaWen,updateDocument1} from "../../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal,Popconfirm,notification } from "antd";
import {GetAllDocuments,updateDocumentXiaWen,UpdateLevel,UPDATE_PILOT_DATA_LEVEL,DeleteDocument} from "../../../Actions/QueryAction";
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
          },{title: '飞行员',
            dataIndex: 'pilotName',
            key: 'pilotName',
          }, {
            title: '流程名',
            dataIndex: 'title',
            key: 'title',
          }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: '已完成', value: '已完成' },
                { text: '已取消', value: '已取消' },
                { text: '进行中', value: '进行中' },
              ],
          onFilter: (value, record) => record.status.includes(value),

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
                  <a onClick={this.AddXiaWen.bind(this,record)}>添加下文|</a>|
                  <a onClick={this.DeleteDocument.bind(this,record)}>|删除该申请</a>
                  </span>)
                else if(record.status == '进行中')
                {
                  return (<span><a>尚未完成|</a>
                  <a onClick={this.DeleteDocument.bind(this,record)}>|删除该申请</a></span> )
                }
                else 
                {
                  return (<span><a onClick={this.DeleteDocument.bind(this,record)}>|删除该申请</a></span>)
                }
                 
                }
                }
          ];
          const {query} =this.props;
          var lists = query.AllDocuments;
        this.state={ 
        columns:columns,
        visible:false,
        editdata:null,
        list:lists,
        deleteShow:false,
        deleteTarget:{}
        
      }
  }

DeleteDocument(record)
{
  console.log(record)
  this.setState({deleteShow:true,deleteTarget:record})
}

DeleteConfirm()
{
  this.props.dispatch(DeleteDocument(this.state.deleteTarget))
     notification['success']({
          message: '完成',
        description: '已经删除',
    })
    var newdocuments=this.state.list.filter((document)=> { if(document.documentId != this.state.deleteTarget.documentId) return document;  })
      this.setState({list:newdocuments,deleteShow:false,deleteTarget:null});

}
CancelDelete()
{
this.setState({deleteShow:false,deleteTarget:null})
}



AddXiaWen(record){
console.log(record);
   this.setState({visible:true,
                    target:record
                  })
  const message = {
    workflowid:record.workflow_id,
    description:"恭喜您完成训练，下文已经完成,你已经升级为"+record.target_level,
    owner:record.cert_id,
    status:"xiawen",
    applierId:record.cert_id
  }
  this.props.dispatch(SubmitMessageForXiaWen(message));
  const newdocument ={
    documentId:record.documentId,
    status:"已下文"
  }
  this.props.dispatch(updateDocument1(newdocument));


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
    //message target 



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

        <Modal
        visible={this.state.deleteShow}
        onOk={this.DeleteConfirm.bind(this)}
        onCancel={this.CancelDelete.bind(this)}
        >
          确定要删除? {this.state.deleteTarget?this.state.deleteTarget.cert_id:""}的 {this.state.deleteTarget?this.state.deleteTarget.documentId:""}?
                </Modal>


        </div>
      );
  }

}