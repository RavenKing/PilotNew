import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {Button,Table,Card,Icon,Form,Modal,Input,Select,Checkbox} from "antd";
const FormItem = Form.Item;
const Option=Select.Option;
let uuid = 0;
 @connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})

class CollectionCreateForm1 extends React.Component{
  
    constructor(props)
    { 
      super(props);
      this.state={
        exsitingCon:[],
        exsitingKeys:0
      }
    }

    handleSubmit(e) {

    this.props.form.validateFields((err, values) => {
    console.log(values)

    var conditionsdata=[];
//exsiting flights
if(this.state.exsitingKeys)
{
      for(var i=0;i<this.state.exsitingKeys;i++)
      {
      var conValue = `econdition${i}`;
      if(values[conValue])
        conditionsdata.push(values[conValue]);
      }
}
// end of existing flight
//format flights 
    for(var i =0;i<values.keys.length;i++)
    {     
      var condName = `condition${values.keys[i]}`;
      if(values[condName])
        conditionsdata.push(values[condName]);       
         console.log(condName)
        console.log(values[condName])
    }
    values.conditions = conditionsdata;
// end of format

  console.log(conditionsdata)
        console.log("formatted:",values)
                this.props.onCreate(values);
    this.props.form.resetFields();

        if (err) {
        return;
      }

    });
  }


componentWillReceiveProps(nextProps)
{
  if(this.state.initdata!=nextProps.initdata)
  {
    const {initdata} = nextProps
          if(initdata)
      if(initdata.conditions)
      this.setState({
        exsitingCon:initdata.conditions,
        exsitingKeys:initdata.conditions.length
      })
  }

}

onCancel1()
{

  this.setState({
        exsitingCon:[],
        exsitingKeys:0})
  this.props.onCancel();
}

//dynamic add and delete
  remove = (k) => {
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
  }

  add = () => {
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
  }
 removee(indexx)
  {

    var newdata=this.state.exsitingCon.filter((flight,index)=>{

      if(index!==indexx)
      return  flight;
    })
    this.setState({
      exsitingCon:newdata,
      exsitingKeys:newdata.length
    })
  }



    render(){
 
    var levels = this.props.pilot.Levels.entries;
    var optionChoice = levels.map((level,i)=>{
      return <Option key={i} value = {level.level}>{level.level}</Option>
    })
    const { visible, onCancel, onCreate, form ,initdata} = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

//dynmic 
  getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '条件' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`condition${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "",
            }],
          })(
            <Input placeholder="条件" style={{ width: '60%', marginRight: 8 }} />
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
    //end of dynamic


    ///exsiting
var existingconditions
      if(this.state.exsitingCon)
    {if(this.state.exsitingCon.length>0)
    {

      var existingid = 0 ;
      existingconditions=this.state.exsitingCon.map((con,index)=>{
        console.log(con)
        if(con!=null)
        {
      return ( <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '已存条件' : ''}
          required={false}
          key={`econd${index}`}
        >
          {getFieldDecorator(`econdition${index}`, {
            initialValue:con,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "",
            }],
          })(
            <Input placeholder="条件" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.removee(index)}
          />
        </FormItem>
                     
                                   );
          }
          else
          {
            return <div></div>
          }
      
        });
}
}

if(!initdata)
{
  existingconditions = <div></div>

}


    //ennd of existing


    return (
      <Modal
        visible={visible}
        title={initdata?"修改课程":"创建新流程"}
        okText="保存"
        onCancel={this.onCancel1.bind(this)}
        onOk={this.handleSubmit.bind(this)}
      >
        <Form vertical>
          <FormItem label="流程编号">
            {getFieldDecorator('workflow_id', {
              rules: [{ required: true, message: '流程编号' }],
              initialValue: initdata?initdata.workflow_id:""
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="流程标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入课程标题' }],
              initialValue: initdata?initdata.title:""

            })(
              <Input />
            )}
          </FormItem>
           
          <FormItem label="描述">
            {getFieldDecorator('description',
            {initialValue:initdata?initdata.description:""}
            )(<Input type="textarea" />)}
          </FormItem>
           <FormItem label="当前等级">
            {getFieldDecorator('previous_level', {
              rules: [{ required: true, message: '请输入当前等级' }],
              initialValue:initdata?initdata.previous_level:""
            })(
                <Select style={{width:200}}>
                {optionChoice}
              </Select>
            )}
          </FormItem> <FormItem label="目标等级">
            {getFieldDecorator('target_level', {
              rules: [{ required: true, message: '请输入课程标题' }],
              initialValue:initdata?initdata.target_level:""
            })(
                <Select style={{width:200}}>
                {optionChoice}
              </Select>
            )}
          </FormItem>
          {existingconditions}
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
            <Icon type="plus" /> 增加条件
          </Button>

          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
          </FormItem>
        </Form>
        <p>请在成功创建流程后添加课程 </p>
      </Modal>
    ); 
  } 
}


const CollectionCreateForm = Form.create()(CollectionCreateForm1);

export default CollectionCreateForm;