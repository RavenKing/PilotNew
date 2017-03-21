import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay,AddNewWorkFlow,InitialWorkflows,DeleteWorkflowForm,ChangeWorkFlow} from "../../Actions/pilotAction"
import {Table,Card,Icon,Button,Form,Modal} from "antd";
import NewWorkflowForm from "./NewWorkflowForm";
import ChangeWorkflowForm from "./ChangeWorkflowForm"

@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class DisplayWorkFlow extends React.Component { 
    constructor(props)
    {
      super(props);
      this.state={
        visible:false,
        changeWorkflowId:"",
        workflow:{},
        editdata:null,
        conditions:[]
      }
    }

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

    WorkFlowDetail(e){
      // console.log(e.target.rel)
      // console.log("workflow detail view")
      var data = {
        type:"workflowdetail",
        workflowid:e.target.rel,
        cardid:Math.random()*10000000
      }
      this.props.dispatch(AddCardToDisplay(data))
    }

    ConditionDetail(e){


    }

  EditRow(e)
  {
    let data = JSON.parse(e.target.rel);

    this.setState({
      visible:true,
      editdata:data
    })
  }

  RemoveCard()
  {
    console.log(this.props.cardid)
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }
  newWorkflow(){
    this.setState({editdata:null});
    this.setState({visible:true});
  }
  

  saveFormRef(form){this.form = form;}

  DeleteWorkflowForm(e){
    this.props.dispatch(DeleteWorkflowForm(e.target.rel));
  }

  onCancel(){
    this.setState({visible:false});
  }

  onCreate(){
  const form = this.form;
  form.validateFields((err, values) => {
      console.log("values are",values);
      if (err) {
        return;
      }
      if(this.state.editdata == null)
      {
      var steps = [];
      var length = values.keys.length;
      var conditions = [];
      for(let i = 0;i<length;i++)
      { 
        var temp = "condition"+(i+1);
        conditions[i] = values[temp];
        delete values[temp];
      }
      values['conditions']=conditions;
      let newWorkflow = values;
      // delete newWorkflow['keys'];
      // console.log("workflows are",values);
      newWorkflow = {...newWorkflow,steps:steps};
      // console.log("what is in newWorkflow",newWorkflow);

      this.props.dispatch(AddNewWorkFlow(newWorkflow)); 
      } 
      console.log("this.state.editdata is ",this.state.editdata);
      if(this.state.editdata != null)
      {
      var steps = [];
      var length = values.keys.length;
      console.log("values is ",values);
      console.log("length is",length);
      var conditions = [];
      for(let i = 0;i<10;i++)
      { 

        var temp = "condition"+(i+1);
        if(values[temp]!=undefined){
        conditions[i] = values[temp];
        console.log("values[temp]",values[temp]);
        console.log("condition i is",conditions[i]);
        }
        else
          break;
      }
      values['conditions']=conditions;
      let newWorkflow = values;
      // delete newWorkflow['keys'];
      console.log("workflows are",values);
      newWorkflow = {...newWorkflow,steps:steps};
        let updatadata = {
          target:{"workflow_id":values.workflow_id},
          updatepart:newWorkflow
        };
        this.props.dispatch(ChangeWorkFlow(updatadata));
      }   



    })
    form.resetFields();
    this.setState({ 
    visible: false });
  
}


  render() {

const columns = [{
  title: '流程编号',
  dataIndex: 'workflow_id',
  key: 'workflow_id',
  render: (text,record) => <a href="#" onClick={this.WorkFlowDetail.bind(this)} rel={record.workflow_id}>{text}</a>,
}, {
  title: '流程描述',
  dataIndex: 'description',
  key: 'description',
}, {
  title: '标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#" onClick={this.EditRow.bind(this)} rel={JSON.stringify(record)}>修改|</a>
      <a href="#" onClick={this.DeleteWorkflowForm.bind(this)} rel={record.workflow_id}> 删除</a>
      <span className="ant-divider" />
    </span>
  ),
}];

const {Workflows} = this.props.pilot;
console.log("workflows are",Workflows,this.props);

        return (
        <div className="detail-panel">  
          <Card title="流程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <h1>飞行员训练等级选择</h1>
          <Button type="primary" onClick={this.newWorkflow.bind(this)}>新建流程</Button>
          <Table columns={columns} dataSource={Workflows}  class="margin-top10" />
          </Card>
          <NewWorkflowForm 
          visible={ this.state.visible} 
          initdata={this.state.editdata}
          onCancel={ this.onCancel.bind(this)} 
          onCreate={this.onCreate.bind(this)}
          ref={this.saveFormRef.bind(this)}
          />   
        </div>
      );
  }

}