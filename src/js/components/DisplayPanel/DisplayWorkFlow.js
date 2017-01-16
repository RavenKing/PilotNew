import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";


import {RemoveCard,AddCardToDisplay,AddNewWorkFlow} from "../../Actions/pilotAction"
import {Table,Card,Icon,Button,Form,Modal,Input} from "antd";
import NewWorkflowForm from "./NewWorkflowForm";
import NewConditionForm from "./NewConditionForm";
const FormItem = Form.Item;
let uuid = 0;

// @connect((store)=>{    
//     return {
//         pilot:store.pilotinfo
//     };
    
// })
const DisplayWorkFlow = Form.create()(React.createClass({

  getInitialState (props){

    console.log('this.props is ',this.props);
    const {pilotinfo} = this.props;
    return {
      pilot:this.props.pilotinfo
    }
  },   



    // constructor(props)
    // {
    //   super(props);
    //   this.state={
    //     visible:false
    //   }
    // }

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

    },

    WorkFlowDetail(e){
      console.log(e.target.rel)
      console.log("workflow detail view")
      var data = {
        type:"workflowdetail",
        workflowid:e.target.rel,
        cardid:Math.random()*10000000
      }
      this.props.dispatch(AddCardToDisplay(data))

    },

  RemoveCard()
  {
    console.log(this.props.cardid)
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  },
  newWorkflow(){
    this.setState({visible:true});
  },


  saveFormRef(form){this.form = form;},

//下面的函数都是给newcondition form用的

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  add()
    {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  },

  remove (k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  },


  onCancel(){
    this.setState({visible:false});
  },


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
  
},


  render() {
  const { getFieldDecorator, getFieldValue } = this.props.form;
  const columns = [{
  title: '流程编号',
  dataIndex: 'workflow_id',
  key: 'workflow_id',
  render: (text,record) => <a href="#" onClick={this.WorkFlowDetail} rel={record.workflow_id}>{text}</a>,
} , {
  title: '流程名称',
  dataIndex: 'title',
  key: 'title',
},{
  title: '流程描述',
  dataIndex: 'description',
  key: 'description',
}];

const {Workflows} = this.state.pilot;

var temp = Number(Workflows.length)+1;
const newWorkflowId = "workflow"+ temp;


//return 前面这一段都是给newcondition form增加的
    
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });


        return (
        <div className="detail-panel">  
          <Card title="流程列表" extra={<Icon type="cross" onClick={this.RemoveCard} />}>
          <h1>飞行员训练等级选择</h1>
          <Button type="primary" onClick={this.newWorkflow}>新建流程</Button>
          <Table columns={columns} dataSource={Workflows}  />
          </Card>
          <NewWorkflowForm 
          visible={ this.state.visible} 
          onCancel={ this.onCancel} 
          workflowid={newWorkflowId} 
          onCreate={this.onCreate}
          ref={this.saveFormRef}
          />
          <Modal
          visible={true}
          title={"设置条件"}
          okText="保存"
          onCancel={this.onCancel}
          onOk={this.onCreate}
          >
          <Form onSubmit={this.handleSubmit}>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
           <Button type="primary" htmlType="submit" size="large">Submit</Button>
          </FormItem>
          </Form>
          <p>请在成功创建流程后添加课程 </p>
        </Modal>
        </div>
      );
  },
}));

export default DisplayWorkFlow;