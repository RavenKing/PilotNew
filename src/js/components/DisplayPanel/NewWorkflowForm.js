import React from "react";
import ReactDOM from "react-dom";
import {Button,Table,Card,Icon,Form,Modal,Input,Select} from "antd";
const FormItem = Form.Item;
const Option=Select.Option;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form ,workflowid} = props;
    const { getFieldDecorator } = form;
    const { initdata } =props;
    console.log("workflowid is ",workflowid);
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
        </Form>
        <p>请在成功创建流程后添加课程 </p>
      </Modal>
    );
  }
);

export default CollectionCreateForm;