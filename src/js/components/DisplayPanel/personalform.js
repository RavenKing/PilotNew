import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
    });
  },
  render() {
    const {personaldata} = this.props;
    const { getFieldDecorator } = this.props.form;
    let editdisabled = this.props.disabled;
    return (
      <Form onSubmit={this.handleSubmit} className="Personal-Form" horizontal>
             <FormItem label="名字">
          {getFieldDecorator('username', {
            initialValue:personaldata.name
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="name" disabled={editdisabled} className="inputwidth300"/>
          )}
        </FormItem>

        <FormItem label="用户名">
          {getFieldDecorator('username', {
            initialValue:personaldata.username
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" disabled/>
          )}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('password', {
            initialValue:"test"
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" disabled/>
          )}
        </FormItem>
        <FormItem label="所在公司">
          {getFieldDecorator('company', {
            initialValue:personaldata.company
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="company"  disabled={editdisabled} />
          )}
        </FormItem>
        <FormItem label="所在部门">
          {getFieldDecorator('department', {
            initialValue:personaldata.department
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="department"  disabled={editdisabled} />
          )}
        </FormItem>
        <FormItem label="注册时间">
          {getFieldDecorator('create_time', {
            initialValue:personaldata.create_time
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="create_time" disabled/>
          )}
        </FormItem>
      </Form>
    );
  },
}));

export default NormalLoginForm;