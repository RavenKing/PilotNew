import React from "react";
import ReactDOM from "react-dom";
import {Button,Table,Card,Icon,Form,Modal,Input,Select,InputNumber} from "antd";
const FormItem = Form.Item;
const Option=Select.Option;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    const { initdata } =props;
    return (
      <Modal
        visible={visible}
        title={initdata?"修改等级":"创建新等级"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="飞行基数时间（小时）">
            {getFieldDecorator('flight_base', {
              initialValue: initdata?initdata.flight_base:""
            })(
              <InputNumber />
            )}
          </FormItem>
          <FormItem label="等级系数">
            {getFieldDecorator('flight_factor', {
              rules: [{ required: true, message: '等级系数' }],
              initialValue: initdata?initdata.flight_factor:""

            })(
              <InputNumber />
            )}
          </FormItem>
                    <FormItem label="等级">
            {getFieldDecorator('level', {
              rules: [{ required: true, message: '等级' }],
              initialValue: initdata?initdata.title:""

            })(
              <Input />
            )}
          </FormItem>
            <FormItem label="描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入等级描述' }],
              initialValue: initdata?initdata.category:""

            })(
            	<Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CollectionCreateForm;
