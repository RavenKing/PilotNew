import React from "react";
import { Button,Input,Checkbox,InputNumber } from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne } from "../../Actions/KnowledgeAction";

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ArchivingForm extends React.Component { 

    render() {	

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    	
    	return (
        
        <div className="margin-top10 ">

          <Button type="primary">Reset</Button>
          <Button type="primary">Previous</Button>
          <Button type="primary">Next</Button>



        </div>

      );
  }
}
