import React from 'react';
import moment from 'moment';
import { Form, Icon, Input, Button, Checkbox,Select,DatePicker,Row,Col,InputNumber } from 'antd';
import {UPDATE_PILOT_DATA} from "../../Actions/pilotAction.js";
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const RangePicker = DatePicker.RangePicker;
const MonthPicker = DatePicker.MonthPicker;


let uuid = 0;


const NormalLoginForm = Form.create()(React.createClass({

	getInitialState (props){


		const {companys} = this.props;
    const {personaldata} =this.props;
    return {
      departments:companys.length!=0?companys[0].departments:[],
      existingf:personaldata.trained_flights,
      ekeys:personaldata.trained_flights.length
    }
	},

 handleChange(value) {
//change value
    const {companys} = this.props;
    var changedcompany;
    let departments = companys.filter((company)=>{

    	if(company.company_id == value)
    	{	
        changedcompany = company.company_name;
        return company;
      }
    });
 	this.setState({
    newcompanyname:changedcompany,
 		departments: departments[0].departments
 	})


},
  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
    
//format health check 
    const health_check = values['health_check'].format('YYYY-MM-DD');
    var flightdata=[];
//exsiting flights
if(this.state.ekeys)
{
      for(var i=0;i<this.state.ekeys;i++)
      {

      var flightname = "eflight-"+i;
      var flight_type = "eflight_type-"+i;
      var schooltime = "eschooltime-"+i;
        var flight={
            planeType:values[flightname],
            schoolType:values[flight_type],
            train_time:values[schooltime]
        };
        flightdata.push(flight);
      }
}

// end of existing flight
//format flights 
    for(var i =0;i<values.keys.length;i++)
    {     
      var flightname = "flight-"+(i+1);
      var flight_type = "flight_type-"+(i+1);
      var schooltime = "schooltime-"+(i+1);

      var flight={
            planeType:values[flightname],
            schoolType:values[flight_type],
            train_time:values[schooltime]
        };
        flightdata.push(flight);
    }
    console.log(flightdata)
    values.trained_flights = flightdata;
    values.health_check = health_check;
    values.level={"current_level":values.current_level};
// end of format
      values.company=this.state.newcompanyname;
      console.log(values)
        this.props.update_data(values);

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
  removee(indexx)
  {

    var newdata=this.state.existingf.filter((flight,index)=>{

      if(index!==indexx)
      return  flight;
    })
    this.setState({
      existingf:newdata,
      ekeys:newdata.length
    })
  },

  add () {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    console.log(keys)
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
    const {levels} = this.props;
    var levelOption;
    //set not working
    let number = getFieldValue('keys');

    // levels setup
    if(levels)
    {
  levelOption = levels.entries.map((one)=>{

    return <Option value={one.level} key={one.level}>{one.level}</Option>
  })
    }
    //

//layout of the form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 1},
    };


var existingflights;
    // dynamic add
    console.log(this.state)
    if(this.state.existingf)
    {if(this.state.existingf.length>0)
    {

      var existingid = 0 ;
      existingflights=this.state.existingf.map((flight,index)=>{
        if(flight!=null)
        {
      return (
                      <Row>
                      <Col span={8}>
                              <FormItem
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '已存机型及时间' : ''}
                                required={false}
                                key={'exsting'+index}
                              >
                                {getFieldDecorator(`eflight-${index}`, {
                                  initialValue:flight.planeType,
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
                                  onClick={() => this.removee(index)}
                                />
                              </FormItem>
                      </Col>
                      <Col span={8}>  
                            <FormItem
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? '飞行时间' : ''}
                                required={false}
                                key={'eschool'+index}
                              >
                                {getFieldDecorator(`eschooltime-${index}`,{
                                    initialValue:[moment(flight.train_time[0],'YYYY-MM-DD' ),moment(flight.train_time[1],'YYYY-MM-DD' )]


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
                                key={'eflighttype'+index}
                              >
                                {getFieldDecorator(`eflight_type-${index}`,{
                                   initialValue:flight.schoolType,
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
          }
          else
          {
            return <div></div>
          }
      



      })


    }


}


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
          {getFieldDecorator(`schooltime-${k}`)(
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
          {getFieldDecorator(`flight_type-${k}`,{
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
      <FormItem label="userid">
          {getFieldDecorator('userid', {
            initialValue:personaldata.userid
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="userid" disabled={true} className="inputwidth300"/>
          )}
        </FormItem>


          
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
            initialValue:personaldata.password
                      })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" disabled/>
          )}
        </FormItem>


        <Row>
        <Col span={12}>
        <FormItem label="所在公司">
          {getFieldDecorator('company_id', {
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
          {getFieldDecorator('personnal_type',{
        initialValue:personaldata.personnal_type

          })(
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
          initialValue:moment(personaldata.health_check?personaldata.health_check:'2017-01-01','YYYY-MM-DD' ),
        rules: [{ type: 'object', required: false, message: 'Please select time!' }],
    })(
                   <DatePicker format = 'YYYY-MM-DD' />
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
          initialValue:personaldata.basemonth,
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
          initialValue:personaldata.level?personaldata.level.current_level:"F0",
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    })(
  <Select
    style={{ width: 200 }}
    placeholder="请选择飞行等级"
  >
  {levelOption}
  </Select>   
          )}
        </FormItem>
</Col>
</Row>




      {existingflights}

        {formItems}

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
            <Icon type="plus" /> 添加机型
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