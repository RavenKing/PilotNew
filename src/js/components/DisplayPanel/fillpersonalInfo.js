import React from 'react';
import { Form, Icon, Input, Button, Checkbox,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;


let uuid = 0;
const NormalLoginForm = Form.create()(React.createClass({

	getInitialState (props){


		const {companys} = this.props;

		return {departments:companys[0].departments}
	},

 handleChange(value) {
//change value
    const {companys} = this.props;

    let departments = companys.filter((company)=>{

    	if(company.company_id == value)
    		return company;

    });
    console.log(departments[0].departments)
 	this.setState({
 		departments: departments[0].departments
 	})


},
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

    });
  },

//for dynamic add 
componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
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

  add () {
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




  render() {
    const {personaldata} = this.props;
    const { getFieldDecorator,getFieldValue  } = this.props.form;
    let editdisabled = this.props.disabled;
    const {companys} = this.props;

//layout of the form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

    // dynamic add 

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    // dynamic items
     const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '毕业学院' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "填写毕业学院",
            }],
          })(
            <Input placeholder="学院名称" style={{ width: '60%', marginRight: 8 }} />
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

    //set select option for company
    let companyselect=companys.map((one)=>{
    	return <Option value={one.company_id} key={one.company_id}>{one.company_name}</Option>

    });

	// set select option for deparments

    let departmentsselect = this.state.departments.map((department)=>{
	return <Option value={department.name} key={department.name}>{department.name}</Option>


    });
	


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
            <Select
    style={{ width: 200 }}
    placeholder="选择一个公司"
      onChange={this.handleChange}
  >
		{companyselect}
  </Select>)}
        </FormItem>
        <FormItem label="所在部门">
          {getFieldDecorator('department', {
            initialValue:personaldata.department
          })(          
  <Select
    style={{ width: 200 }}
    placeholder="选择一个部门"
  >
		{departmentsselect}
  </Select>)}
        </FormItem>
		



        <FormItem label="注册时间">
          {getFieldDecorator('create_time', {
            initialValue:personaldata.create_time
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="create_time" disabled/>
          )}
        </FormItem>
          <FormItem>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
        {formItems}

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加学院
          </Button>
        </FormItem>
              </Form>
    );
  },
}));

export default NormalLoginForm;