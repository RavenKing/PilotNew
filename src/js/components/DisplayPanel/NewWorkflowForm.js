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
        
      }
    }

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
    }

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
  }

    render(){
    // console.log("this.props",this.props);
    const { visible, onCancel, onCreate, form ,workflowid} = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { initdata } =this.props;

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
          label={index === 0 ? '转升条件' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`condition${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="请输入条件
            " style={{ width: '60%', marginRight: 8 }} />
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
      <Modal
        visible={visible}
        title={initdata?"修改课程":"创建新流程"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="流程编号">
            {getFieldDecorator('workflow_id', {
              rules: [{ required: true, message: '流程编号' }],
              initialValue: workflowid
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
              rules: [{ required: true, message: '请输入当前等级' }]
            })(
                <Select style={{width:200}}>
                <Option value="F0">F0</Option>
                <Option value="F1">F1</Option>
              </Select>
            )}
          </FormItem> <FormItem label="目标等级">
            {getFieldDecorator('target_level', {
              rules: [{ required: true, message: '请输入课程标题' }]
            })(
                <Select style={{width:200}}>
                <Option value="F1">F1</Option>
                <Option value="F2">F2</Option>
              </Select>
            )}
          </FormItem>
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