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
    return (
      <Modal
        visible={visible}
        title={initdata?"修改课程":"创建新流程"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="阶段名称">
            {getFieldDecorator('stepName', {
              rules: [{ required: true, message: '阶段名称' }],
              initialValue: workflowid
            })(
              <Input />
            )}
          </FormItem>   
        </Form>
        <p>请在成功创建流程后添加课程 </p>
      </Modal>
    );
  }
);

export default CollectionCreateForm;