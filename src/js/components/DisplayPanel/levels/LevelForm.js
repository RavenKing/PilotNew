import React from "react";
import ReactDOM from "react-dom";
import {Button,Table,Card,Icon,Form,Modal,Input,Select} from "antd";
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
        title={initdata?"修改课程":"创建新课程"}
        okText="保存"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="等级系数">
            {getFieldDecorator('flight_factor', {
              rules: [{ required: true, message: '自定义课程编号' }],
              initialValue: initdata?initdata.course_id:""

            })(
              <Input />
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
