import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Moda } from "antd";
const ButtonGroup = Button.Group;
import { connect } from "react-redux";

import { ForwardStep,GetTop5Tables,SetArticleNamAndDsc,GetPractices } from "../../Actions/KnowledgeAction";

//back
import BackButton from "./BackButton";

const FormItem = Form.Item;


@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class ObjectDefinition extends React.Component {

    constructor(props) {

        super(props);
        const { newArticle } = this.props.articles;
        const {auth} = this.props;
        const {user} = auth;

        var customer_id = "";
        var article_nam = "";
        var article_dsc = "";
        var obj = "";

        if(user.CUSTOMER_ID){
          customer_id = user.CUSTOMER_ID;
        }
        if(newArticle.ARTICLE_NAM){
            article_nam = newArticle.ARTICLE_NAM;
        }
        if(newArticle.ARTICLE_DSC){
           article_dsc = newArticle.ARTICLE_DSC;
        }
        if(newArticle.ARCHOBJ){
          obj = newArticle.ARCHOBJ;
        }
        this.state={ 
          objectstatus:"",
          objecthelp:"",
          visible:false,
          customer_id:customer_id,
          article_nam:article_nam,
          article_dsc:article_dsc,
          obj:obj

        }
    }


    GoToStepThree()
    {
        //users do not input the archiving object or table 
        if(this.state.obj == ""){

          this.setState({
            objectstatus:"obj",
            objecttype:"error",
            objecthelp:"please input an object or table!"
          })
        }
        else if(this.state.article_nam == ""){
          this.setState({
            objectstatus:"article_nam",
            objecthelp:"please input article name"
          })
        }
        else{
          this.setState({
            objectstatus:"obj",
            objecttype:"validating",
            objecthelp:"validating"
          });
          this.props.dispatch(GetTop5Tables(this.state.obj));     
          const { newArticle } = this.props.articles;

          setTimeout(function(){this.CheckExist(newArticle)}.bind(this),1000)
        }
        

      }
      CheckExist(newArticle)
      {
          if(newArticle.TABLES == undefined)
          { 

          this.setState({
            objectstatus:"obj",
            objecttype:"error",
            objecthelp:"please input an correct object or table!"
          })

          }
          else{
            this.props.dispatch(SetArticleNamAndDsc(this.state));  
            this.props.dispatch(GetPractices(this.state.obj));
            setTimeout(function(){this.props.dispatch(ForwardStep())}.bind(this),1000);
          }

      }
   
    handleChange(e){
        var value = e.target.value;
        switch(e.target.name ){
          case "article_nam":
          {
              this.setState({article_nam:value});
              break;
          }
          case "article_dsc":
          {
              this.setState({article_dsc:value});
              break;
          }
          case "obj":
          {
              this.setState({obj:value.toUpperCase()});
              break;
          }
        }
        

    }

    render() {
        console.log(this.props);
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };

        return (
        	<div>
              <Form horizontal >
                <FormItem
                  {...formItemLayout}
                  label="Customer ID"
                >
                  <p className="ant-form-text" id="userName" name="userName">{this.state.customer_id}</p>                  
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Type"
                >
                  <p className="ant-form-text" id="typeName" name="typeName">DVM</p>                  
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="Article Name:"
                  validateStatus={this.state.objectstatus=="article_nam"?"error":""}
                  help={this.state.objectstatus=="article_nam"?this.state.objecthelp:""}
                >
                  <Input name="article_nam" type="text"  defaultValue={this.state.article_nam} placeholder="Type in an article name" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="Article Description:"
                >
                  <Input name="article_dsc" type="text"  defaultValue={this.state.article_dsc} placeholder="Type in a description of the article" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="What object do you want to record"
                  validateStatus={this.state.objectstatus=="obj"?this.state.objecttype:""}
                  help={this.state.objectstatus=="obj"?this.state.objecthelp:""}
                >
                  <Input name="obj" type="text"  defaultValue={this.state.obj} placeholder="Type in a table name or archiving object" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
              

      <ButtonGroup>
      <BackButton/>
      <Button type="primary" onClick={this.GoToStepThree.bind(this)}>
        Go forward <Icon type="right" />
      </Button>
    </ButtonGroup>


        
                </FormItem>

              </Form>



          </div>

      );
    }
}
