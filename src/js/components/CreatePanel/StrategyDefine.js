import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,Popover,Modal } from "antd";
const ButtonGroup = Button.Group;
import { connect } from "react-redux";

import { 
          NewArticleStepOne,SetSaving,
          PostArticle,CloseCreatePanel,
          fetchArticles,ForwardStep
        } from "../../Actions/KnowledgeAction";

//Forms
import ArchivingForm from "./ArchivingForm";
import AvoidanceForm from "./AvoidanceForm";
import SummarizationForm from "./SummarizationForm";
import DeletionForm from "./DeletionForm";

const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

//back 
import BackButton from "./BackButton";

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class StrategyDefine extends React.Component {
  
    constructor(props)
    {
 	      super(props);
        
 	      this.state={
            
            DVM:[]
 	      
        }
    }

    onChange(checked){

        this.setState({
	         DVM:checked,
        })

    }
    
    handleClick(){
        var validInput = true;
        var saving_est = this.refs.sav_est.refs.input.value;
        var saving_est_p = this.refs.sav_est_p.refs.input.value;
        var saving_act = this.refs.sav_act.refs.input.value;
        var saving_act_p = this.refs.sav_act_p.refs.input.value;        
        var comment = this.refs.com.refs.input.value;
        if(isNaN(saving_est)){
          validInput = false;
          
        }
        if(isNaN(saving_est_p)){
          validInput = false;
          
        }
        if(isNaN(saving_act)){
          validInput = false;
          
        }
        if(isNaN(saving_act_p)){
          validInput = false;          
        }
        if(validInput == true){
          var data={
            saving_est:saving_est,
            saving_est_p:saving_est_p,
            saving_act:saving_act,
            saving_act_p:saving_act_p,
            comment:comment
          };

          this.props.dispatch(SetSaving(data));

          const { user } = this.props.auth
          const { newArticle } = this.props.articles;
          var data ={ newArticle : newArticle,
                      user: user
                    }
          this.props.dispatch(PostArticle(data));
          this.props.dispatch(CloseCreatePanel());
        }
        else{
          const modal = Modal.warning({
            title: 'Warning! ',
            content: 'Please input the correct number'
          });
        }
        
        
    }

    render() {	

      const formItemLayout = {
        
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };

    	const DVMmethod = [
    	   
          {label:"Avoidance",value:"Avoidance",checked:true},
          {label:"Summarization",value:"Summarization",checked:false},
          {label:"Deletion",value:"Deletion",checked:false},
          {label:"Archiving",value:"Archiving",checked:true}
    	]

    	const { DVM }  = this.state;
    		

      var displaypart= DVM.map((item)=>{
          switch(item){
            case "Archiving":
            {
              return <ArchivingForm />
            }
            case "Avoidance":
            {
              return <AvoidanceForm />
            }
            case "Summarization":
            {
              return <SummarizationForm />
            }
            case "Deletion":
            {
              return <DeletionForm />
            }
            default:{
              return ;
            }
          }

    	});



    	return (
        <div>
          <h3>Saving Potential</h3>
              <hr />
              <br />
              <Form horizontal>
                <FormItem
                  label="Estimated Saving Potential(GB):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input ref="sav_est" defaultValue={this.state.saving_est} />
              </FormItem>

              <FormItem
                  id="control-sav_est_p"
                  label="Estimated Saving Potential(%):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input  ref="sav_est_p" defaultValue={this.state.saving_est_p} />
              </FormItem>

                <FormItem
                  id="control-sav_act"
                  label="Actual Saving Potential(GB):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input   ref="sav_act" defaultValue={this.state.saving_act} />
              </FormItem>

              <FormItem
                  id="control-sav_act_p"
                  label="Actual Saving Potential(%):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input  ref="sav_act_p" defaultValue={this.state.saving_act_p} />
              </FormItem>               

              </Form>





        	<h3> Strategy </h3>
          <hr />
        	<div className="margin-top10">
            <div className="aligncenter margin-bottom10">
              <Popover content="75% of our customers choose Archiving">
              <div>
              <CheckboxGroup options={DVMmethod} onChange={this.onChange.bind(this)}/>
              </div>
              </Popover>
            </div>
            {
              displaypart
            }
            <hr />
            <div className="margin-top10">
              <Form horizontal >
                <FormItem
                  id="control-comm"
                  {...formItemLayout}
                  label="Overview Comments"
                >
                <Input ref="com" type="textarea"  defaultValue={this.state.comment} placeholder="Current Strategy Of your System" />
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>

            <ButtonGroup>
             <BackButton/>
            <Button type="primary" onClick={this.handleClick.bind(this)}>Save</Button>
            
            </ButtonGroup>

            </FormItem>
              </Form>
            </div>
        	</div>
         
        </div>

      );
  }
}
