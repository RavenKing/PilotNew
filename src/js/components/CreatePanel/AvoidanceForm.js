import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,InputNumber,Popover } from "antd";

import { connect } from "react-redux";

import { SetAvoidance } from "../../Actions/KnowledgeAction";


const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class AvoidanceForm extends React.Component { 

    handleChange(e){
      
      this.props.dispatch(SetAvoidance(e.target.value));
    }

    render() {	

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    	
    	return (
        
        <div className="margin-top10 ">
        <h3 className="margin-top10 aligncenter"> Avoidance Strategy</h3>
        <Form horizontal >
        
        
        <FormItem
          {...formItemLayout}
          label="Avoidance"
        >
          <Input type="textarea"  placeholder="Current Strategy Of your System" onChange={this.handleChange.bind(this)} />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        </FormItem>
      </Form>



        </div>

      );
  }
}
