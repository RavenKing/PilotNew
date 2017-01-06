import React from 'react';
import { Form, Icon, Input, Button, Checkbox,Select,DatePicker,Row,Col,InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const RangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;


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
      console.log(values);
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
      wrapperCol: { span: 20, offset: 1},
    };

    // dynamic add 

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    // dynamic items
     const formItems = keys.map((k, index) => {
      return (
<Row>

<Col span={8}>
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '机型及时间' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`flight-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "机型",
            }],
          })(
            <Input placeholder="机型" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
</Col>
<Col span={8}>  
      <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '飞行时间' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`schooltime-${k}`, { 
            rules: [{ type: 'array', required: true, message: '请选择时间!' }]
          })(
            <RangePicker showTime format="YYYY-MM-DD" />
          )}

      </FormItem>
    </Col>

<Col span={8}>
       <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '类型' : ''}
          required={true}
          key={k}
        >
          {getFieldDecorator(`flight_type-${k}`, { 
            rules: [{ type: 'array', required: false, message: '请选择类型!' }]
          })(
            <Select>
            <Option value="航校">航校机型</Option>
            <Option value="航空">航空公司机型</Option>
            </Select>

      
              )}

      </FormItem>



</Col>

</Row>

             );
    });
     //end of dynnamic items

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
          
<Row>
      <Col span={12}>
          <FormItem label="名字">
          {getFieldDecorator('name', {
            initialValue:personaldata.name
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="name" disabled={editdisabled} className="inputwidth300"/>
          )}
        </FormItem>
  </Col>
  <Col span={12}>
       <FormItem label="身份证">
          {getFieldDecorator('cert_id', {
            initialValue:personaldata.cert_id
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="身份证" disabled={editdisabled} className="inputwidth300"/>
          )}
        </FormItem>
    

  </Col>

</Row>        
<Row>
    
<Col span={12}>
        <FormItem label="用户名" formItemLayout>
          {getFieldDecorator('username', {
            initialValue:personaldata.username
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" disabled/>
          )}
        </FormItem>
        </Col>
          <Col span={12}>
  <FormItem label="注册时间">
          {getFieldDecorator('create_time', {
            initialValue:personaldata.create_time
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="create_time" disabled/>
          )}
        </FormItem>
  </Col>
</Row>

        <FormItem label="密码">
          {getFieldDecorator('password', {
            initialValue:"test"
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" disabled/>
          )}
        </FormItem>


        <Row>
        <Col span={12}>
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
      </Col>
      <Col span={12}>
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
    </Col>
    </Row>

    <Row>
    <Col span={12}>
  <FormItem label="生源类型">
          {getFieldDecorator('personnal_type')(
            <Select
    style={{ width: 200 }}
    placeholder="请选择类型"
  >
    <Option value="养成" key="yangcheng">养成</Option>   
     <Option value="大改" key="dagai">大改</Option>
  </Select>)}
        </FormItem>
        </Col>
        <Col span={12}>
         <FormItem
          label="体检日期"
        >
        {getFieldDecorator('health_check', {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    })(
                   <DatePicker />
          )}
        </FormItem>
  </Col>

  </Row>

    
<Row>
<Col span={12}>
<FormItem formItemLayoutWithOutLabel
          label="基准月"
        >
        {getFieldDecorator('basemonth', {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    })(
                   <InputNumber />
          )}
        </FormItem>

</Col>

<Col span={12}>
  
<FormItem
          label="当前飞行等级"
        >
        {getFieldDecorator('current_level', {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    })(
  <Select
    style={{ width: 200 }}
    placeholder="请选择飞行等级"
  >
    <Option value="F0" key="F0">F0</Option>   
     <Option value="F1" key="F1">F1</Option>
  </Select>   
          )}
        </FormItem>
</Col>
</Row>




      

        {formItems}

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加学院
          </Button>

        <FormItem>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
        </FormItem>
              </Form>
    );
  },
}));

export default NormalLoginForm;