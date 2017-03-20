import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../../interactScript";

import {GetQueryResults}  from "../../../Actions/QueryAction"
import {Card,Icon,Button,Form,Input,InputNumber,Row,Col,Select,Table,Modal,Popconfirm,message} from "antd";
import {RemoveCard,AddCardToDisplay,updateDocument1 } from "../../../Actions/pilotAction"
import {GetWorkflows,CreateDocument,GetDocumnts} from "../../../Actions/pilotAction";
import ConditionCheck from "./ConditionCheck"

const Option=Select.Option;


@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo,
        auth:store.auth,  
        query:store.query
    };
    
})
export default class DocumentPanel extends React.Component {
 
  constructor(props)
  {
    super(props)
    let user = {};

//columns setting

      const columns = [{
              title: '流程ID',
              dataIndex: 'workflow_id',
              key: 'workflow_id',
              render: (text,record) =>
            <a href="#" onClick={this.getWorkflowDetail.bind(this,record)} rel={record.workflow_id} >{record.workflow_id}</a>
            }, 
            {
              title: '流程标题',
              dataIndex: 'title',
              key: 'title',
            },{
              title: '流程状态',
              dataIndex: 'status',
              key: 'status',
            }, {
              title: '创建时间',
              dataIndex: 'start_date',
              key: 'start_date',
            },{
              title: '初始等级',
              dataIndex: 'previous_level',
              key: 'previous_level',
            },{
              title: '目标等级',
              dataIndex: 'target_level',
              key: 'target_level',
            },{
              title:'操作',
              key:'action',
              render: (record) =>{
          if(record.status!="已取消")
          {  

            return     (<span>
                    <Popconfirm title="确定取消申请?"  onConfirm={this.CancelDocument.bind(this,record)}>
                    <a>取消申请</a>
                    </Popconfirm>
                    </span>
                )
          }
              }
            }];


            //set available workflows



            if(this.props.targetdata)
            {
              const {query} = this.props;
              var documents = query.pilots.filter((one)=>{
                if(one.cert_id==this.props.targetdata.cert_id)
                return one.Workflows;
              })


                this.state={
                user:this.props.targetdata,
               workflows:props.pilotinfo.Workflows,
                documents:documents?documents[0].Workflows:[],
                columns:columns,
                visible:false,
                displaymode:true,
                conditions:[]
              }
            }
          else  if(props.auth.token.authorized == true)
              {
                user = props.pilotinfo.Pilot;
                
                const availableworkflows =props.pilotinfo.Workflows.filter((one)=>{
                  if(user.level.current_level == one.previous_level)
                    return one ;
                }) 


                 this.state={
                user:user,
                workflows:availableworkflows,
                documents:props.pilotinfo.Documents,
                columns:columns,
             displaymode:false,
                visible:false,
                conditions:[]
              }
              }
   
  }


//CancelDocument

CancelDocument(record){

  var targetDoc={documentId:record.documentId,status:"已取消"}
  this.props.dispatch(updateDocument1(targetDoc))
  Modal.info({title:"该申请已取消",content:"该申请已取消"+record.documentId});
  this.state.documents.filter((document)=>{
    if(document.documentId == record.documentId)
    {
      document.status = "已取消"
    }
  })
  
}

  GetCheck(){
    console.log(this.props.pilotinfo);
   const {LevelInfo} = this.props.pilotinfo;

    const {user} = this.state;
    console.log(user.level.current_level);
    console.log(user.flightinfo.flightTotalTime)
    if(user.flightinfo.flightTotalTime < LevelInfo.flight_base)
    {

      Modal.error({title:"无法申请/不符合条件",content:"申请不符合条件，您目前的飞行总经历时间为" +user.flightinfo.flightTotalTime+ "而下一级所需要总经历时间为："+LevelInfo.flight_base })
      return;
    }
    


   if(this.state.apply_workflow==null)
{Modal.info({title:"请选择申请流程",content:"请选择申请流程"})
  return;
 } 
 let targetWorkflow= this.state.workflows.filter((workflow)=>{
      if(workflow.workflow_id == this.state.apply_workflow)
          return workflow;
           })
    this.setState({visible:true,conditions:targetWorkflow[0].conditions});
  }

  SubmitDocument(){    

    if(this.state.apply_workflow==null)
      return;

    let targetWorkflow= this.state.workflows.filter((workflow)=>{
      if(workflow.workflow_id == this.state.apply_workflow)
          return workflow;
           })
    var targetworkflow = targetWorkflow[0];
    var steps = targetworkflow.steps;
    steps = steps.map((step,i)=>{
      if(i == 0)
      var newStep = {
        courses:step.courses,
        name:step.name,
        sequence:step.sequence,
        status:"processing"
      }
      else
        var newStep = {
        courses:step.courses,
        name:step.name,
        sequence:step.sequence,
        status:"ready"
      }
      return newStep;
     })
    var documentId = Number(new Date());
    let newDocument={
      cert_id:this.state.user.cert_id,
      pilotName:this.state.user.name,
      workflow_id:this.state.apply_workflow,
      documentId:documentId,
      title:targetWorkflow[0].title,
      start_date:Date.now(),
      steps:steps,
      previous_level: targetWorkflow[0].previous_level,
      target_level:targetWorkflow[0].target_level,  
      status:"进行中"
    }

    var documents = this.state.documents;
    var flag = true;
    documents.map((doc,i)=>{
      if(doc.cert_id == this.state.user.cert_id && doc.workflow_id == this.state.apply_workflow)
        flag = false;
    })
    if(flag)
      this.props.dispatch(CreateDocument(newDocument));
    flag = true;
    this.setState({visible:false})
  }


  componentWillMount()
  {
    if(this.state.displaymode==false){
    this.props.dispatch(GetQueryResults("{}"));
    this.props.dispatch(GetDocumnts());
  }
  }

   componentWillReceiveProps(nextProps)
  {
    console.log("next props ",nextProps);

    if(this.state.displaymode==false)
    if(nextProps.pilotinfo.Documents)
    {
      const {Documents} = nextProps.pilotinfo;
      this.setState({documents:Documents});
    }
  }


  onChangeApply(value){
    this.setState({
      apply_workflow:value
    })



  }

getWorkflowDetail(record,e){

  if(record.status == "已取消")
  {


    message.error('已经取消，无法继续申请');
  }
  else{
  console.log("documentId is ",record.documentId);
   var data = {
        type:"workflowdetails",
        documentId:record.documentId,
        workflowid:e.target.rel,
        cardid:Math.random()*10000000
      }
      this.props.dispatch(AddCardToDisplay(data))
    }
}

      onCancel(){this.setState({visible:false})}


    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   
    }
    componentWillUnmount() {
    }

    RemoveCard()
    {
    var data={

      cardid:this.props.cardid
    }
    this.props.dispatch(RemoveCard(data))
    }

    render() {
      const {user} = this.state;
      const {workflows} = this.state;
      var documents = this.state.documents;
      console.log(documents);
      if(documents==null)
      {
        documents=[]
      }
      documents = documents.filter((document,i)=>{
        if(document.cert_id == user.cert_id)
          return document;
      })
      const workflowoptions = workflows.map((workflow)=>{
         
            return <Option value={workflow.workflow_id} key={workflow.workflow_id}>{workflow.title}</Option>
        }) 
      let shenqing=<div></div>
      if(this.state.displaymode==false)
      {


         shenqing= <Select  style={{ width: 200 }}  placeholder="选择一个流程" onChange={this.onChangeApply.bind(this)}>
                    {workflowoptions}
                    </Select>
      }


        return (
				<div class="workFlowDetailPanel">

        <Card title="晋升现状"  extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)}/>}>
          <Row>
            <Col span={8}>
            {user.name} | 您的目前等级为: {user.level.current_level} </Col>
              <Col span={8}>
              {shenqing}
            </Col>
            <Col span={8}>

 {   this.state.displaymode?<div></div>:<Button type="primary" onClick={this.GetCheck.bind(this)}>申请</Button> }
            </Col>
          </Row>
<div  class="margin-top10">
        <Table columns= {this.state.columns} dataSource={documents} />
</div>
				</Card>

         <ConditionCheck
          visible={this.state.visible}
          conditions={this.state.conditions}
          onCancel={this.onCancel.bind(this)}
          onCreate={this.SubmitDocument.bind(this)}
        />
				</div>
      );
  }
}

