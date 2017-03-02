import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";
import {RemoveCard,AddCardToDisplay,CreateNewCourse,EditCourse,DeleteCourse} from "../../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal,Popconfirm} from "antd";
import {GetAllDocuments,updateDocumentXiaWen} from "../../../Actions/QueryAction";
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
        this.state={ 
        columns:columns,
        visible:false,
        editdata:null,
        list:query.AllDocuments
      }
  }

AddXiaWen(record){

  this.setState({visible:true,
                   target:record
                  })

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
    this.setState({visible:false,target:null})
    form.resetFields();
    });
}
onCancel()
{}


  render() {
    console.log(this.state.list)
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