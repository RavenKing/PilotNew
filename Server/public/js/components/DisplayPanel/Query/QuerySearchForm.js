import { Form, Row, Col, Input, Button, Icon ,Select,InputNumber} from 'antd';
import React from "react";
import ReactDOM from "react-dom";
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {

  	const Searchoptions=
  	[	
  		{key:"company",value:"company",description:"公司名称"},
  		{key:"department",value:"department",description:"部门"},
  		{key:"cert_id",value:"cert_id",description:"身份证号"},
  		{key:"personnal_type",value:"personnal_type",description:"生源类型"},
  		{key:"level",value:"level.current_level",description:"等级"},
  		{key:"name",value:"name",description:"名字"},
  		{key:"flightRoute",value:"flightRoute",description:"航段"},
  	];
  	const SelectOption = Searchoptions.map(
  		(option)=>{

  			return (<Option value={option.value}>{option.description}</Option>)
  		}
  		)

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    const children = [];
    for (let i = 0; i < 5; i++) {
      children.push(
          <Row gutter={40}>
        <Col span={12} key={"key"+i}>
          <FormItem {...formItemLayout} label={`选择条件 ${i}`}>
            {getFieldDecorator(`field-${i}`)(
             <Select>
             {SelectOption}
             </Select>
            )}
          </FormItem>
        </Col>       
         <Col span={12} key={"value"+i} label={":"}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator(`value-${i}`)(
              <Input placeholder="输入" />
            )}
          </FormItem>
        </Col>
        </Row>
      );
    }

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 2;
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.props.handleSearch}
      >
      

          {children.slice(0, shownCount)}
  


        <Row gutter={40}>
             <Col span={12}>
                    <FormItem   {...formItemLayout} label="飞行时间">
                    {getFieldDecorator('flightTime1', {
                          rules:[{type:"number"}] 
                    })(
                      <InputNumber  addonBefore={<Icon type="swap-right" />} placeholder="飞行时间"      style={{ width: 200 }}/>
                    )}
                  </FormItem>
            </Col>
            <Col span={12}>
                    <FormItem   {...formItemLayout} label="至">
                    {getFieldDecorator('flightValue1')(
                      <Input  addonBefore={<Icon type="swap-right" />} placeholder="飞行时间"      style={{ width: 200 }}/>
                    )}
                  </FormItem>
            </Col>

      </Row>
            <Row gutter={40}>
             <Col span={12}>
                    <FormItem   {...formItemLayout} label="模拟机时间">
                    {getFieldDecorator('flightTime2', {
                          rules:[{type:"number"}] 
                    })(
                      <InputNumber  addonBefore={<Icon type="swap-right" />} placeholder="模拟机时间"      style={{ width: 200 }}/>
                    )}
                  </FormItem>
            </Col>
            <Col span={12}>
                    <FormItem   {...formItemLayout} label="至">
                    {getFieldDecorator('flightValue2')(
                      <Input  addonBefore={<Icon type="swap-right" />} placeholder="模拟机时间"      style={{ width: 200 }}/>
                    )}
                  </FormItem>
            </Col>
      </Row>
                    <Row gutter={40}>
             <Col span={12}>
                    <FormItem   {...formItemLayout} label="经历时间">
                    {getFieldDecorator('flightTime3', {
                          rules:[{type:"number"}] 
                    })(
                      <InputNumber  addonBefore={<Icon type="swap-right" />} placeholder="经历时间"      style={{ width: 200 }}/>
                    )}
                  </FormItem>
            </Col>
            <Col span={12}>
                    <FormItem   {...formItemLayout} label="至">
                    {getFieldDecorator('flightValue3')(
                      <Input  addonBefore={<Icon type="swap-right" />} placeholder="经历时间"      style={{ width: 200 }}/>
                    )}
                  </FormItem>
            </Col>
      </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              更多条件 <Icon type={expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>

      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;