import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,InputNumber,Popover } from "antd";

import { connect } from "react-redux";

import { SetRetention,SetArchiving } from "../../Actions/KnowledgeAction";


const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ArchivingForm extends React.Component {

    onChange(value){
      this.props.dispatch(SetRetention(value));  
    }
    

    handleChange(e){
      
      var value = e.target.value;

      this.props.dispatch(SetArchiving(value));
      
    }

    render() {	


        const { newArticle } = this.props.articles; 
        const { bestpractice } = newArticle;
        var time ; 
        if(bestpractice)
        {
          const {result } =bestpractice;
          time =  result.BEST_PRACTICE;
          console.log(result)
        }

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    	
    	return (
        
        <div className="margin-top10 ">
        <h3 className="margin-top10 aligncenter"> Archiving Strategy</h3>
        <Form horizontal >
        <FormItem
          {...formItemLayout}
          label="Retention Time"
        >
        <Popover content={"Average:"+time?time:12+"Month"} placement="right">
        <div>
         <InputNumber name="retention" min={0} max={999} defaultValue={12}  onChange={this.onChange.bind(this)}/> <p className="ant-form-text" >Month</p>
        </div>
        </Popover>
        </FormItem>
       
        <FormItem
          {...formItemLayout}
          label="Archiving"
        >
          <Input name="archiving" type="textarea" placeholder="Current Strategy Of your System" onChange={this.handleChange.bind(this)} />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        </FormItem>
      </Form>



        </div>

      );
  }
}
