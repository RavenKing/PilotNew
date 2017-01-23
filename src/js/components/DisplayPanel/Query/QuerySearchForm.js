import { Form, Row, Col, Input, Button, Icon ,Select} from 'antd';
import React from "react";
import ReactDOM from "react-dom";
const FormItem = Form.Item;
const Option = Select.Option;
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
  		{key:"level",value:"level.current_level",description:"登记"},
  		{key:"name",value:"name",description:"名字"},
  		{key:"flightRoute",value:"flightRoute",description:"航段"},
  		{key:"flightTime",value:"flightTime",description:"飞行时间"},
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
      	<div>
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
        </div>
      );
    }

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 6;
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.props.handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, shownCount)}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;