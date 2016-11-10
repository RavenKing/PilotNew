import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";


import {RemoveCard,AddCardToDisplay,AddNewWorkFlow} from "../../Actions/pilotAction"
import {Table,Card,Icon,Button,Form,Modal} from "antd";
import NewCourseForm from "./NewWorkflowForm";


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
        visible:false
      }
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
  newWorkflow(){
    this.setState({visible:true});
  }


  saveFormRef(form){this.form = form;}


  onCancel(){
    this.setState({visible:false});
  }


  onCreate(){
  const form = this.form;
  console.log("Let us see whta is in form",form);

  form.validateFields((err, values) => {
      if (err) {
        return;
      }
      var steps = [];
      let newWorkflow = values;
      newWorkflow = {...newWorkflow,steps:steps};
      console.log("what is in newWorkflow",newWorkflow);

      this.props.dispatch(AddNewWorkFlow(newWorkflow)); 
    })
    form.resetFields();
    this.setState({ 
    visible: false });
  
}


  render() {

const columns = [{
  title: 'workflow_id',
  dataIndex: 'workflow_id',
  key: 'workflow_id',
  render: (text,record) => <a href="#" onClick={this.WorkFlowDetail.bind(this)} rel={record.workflow_id}>{text}</a>,
}, {
  title: 'description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions<Icon type="down" />
      </a>
    </span>
  ),
}];

const {Workflows} = this.props.pilot;

var temp = Number(Workflows.length)+1;
const newWorkflowId = "workflow"+ temp;

        return (
        <div className="detail-panel">  
          <Card title="流程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
          <h1>飞行员训练等级选择</h1>
          <Button type="primary" onClick={this.newWorkflow.bind(this)}>新建流程</Button>
          <Table columns={columns} dataSource={Workflows}  />
          </Card>
          <NewCourseForm 
          visible={ this.state.visible} 
          onCancel={ this.onCancel.bind(this)} 
          workflowid={newWorkflowId} 
          onCreate={this.onCreate.bind(this)}
          ref={this.saveFormRef.bind(this)}
          />
        </div>
      );
  }

}