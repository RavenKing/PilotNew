import React from "react";
import { connect } from "react-redux";
import { History,Router } from "react-router";
import { Form, Input, Button, Checkbox,Col,Tabs,Select } from 'antd';
import md5 from "md5-js"
import { setAuthToken,CusRegister,UserRegister,regCheck,personalInfoRegister } from "../../Actions/authAction"

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

@connect((store)=>{
    
    return {
      	auth:store.auth
    };
    
})
export default class Login extends React.Component {
  
    constructor(props){
      
        super(props);
        this.state={
          tab_key:"1"
          
        } 
    }   


    componentWillMount(){
       
        
    }// native funtion , update store 
    callback(key) {
      this.setState({
        tab_key:key
      });
    }
    setAuth(){
      
        this.props.dispatch(setAuthToken(this.state));
        setTimeout(function(){
          const {auth} = this.props;
          const { token } = auth;

          console.log(token.authorized)
          if(token.authorized == true)
          {
              this.props.history.push("/")
          }

        }.bind(this),1000);

    }
 
    UserChange(e){

        this.setState({
          username: e.target.value
        })
    }
    CustomerIdChange(e){
      this.setState({
        customer_id:e.target.value
      })
    }
    PasswordChange(e){

        this.setState({
            password: md5(e.target.value)
        })
    }
    currentLevel(value){
      console.log(value); 
      this.setState({
        currentLevel:value
      });
    }
    saveCusInfo(){
      //customer information
        var userId = this.refs.userId.refs.input.value;
        var name = this.refs.name.refs.input.value;
        var pass = this.refs.pass.refs.input.value;
        var role = this.refs.role.refs.input.value;
        var currentLevel = this.state.currentLevel;
        // var targetLevel = this.state.targetLevel;
        var valid = true;
        var token;
        
        //customer id is filled
        if(valid){
          var userInfo = {};
          userInfo.userId = userId;
          userInfo.name = name;
          userInfo.pass = pass;
          userInfo.role = role;
          userInfo.currentLevel = currentLevel;
          this.props.dispatch(personalInfoRegister(userInfo));   
        console.log(userInfo);
        }

    }
    

    
    render() {


      const {auth} =this.props;
      const {token } = auth;

      
      return  (
      
      
          <div className="login">
            <p id="km-title">国航晋升系统</p>

            <Tabs defaultActiveKey="1"  activeKey={this.state.tab_key} className="login-tab" onChange={this.callback.bind(this)}>
              <TabPane  tab="登录" key="1">           

            {token.error=="password"?"error":""}

            <Form horizontal id="login-form">
              <FormItem               
    
                wrapperCol={{ span: 16 }}
                validateStatus={token.error=="customer_id"?"error":""}
                help={token.error=="customer_id"?token.hint:""}
              
              >
                
                <Input placeholder="Customer ID" onChange={this.CustomerIdChange.bind(this)}/>             
                               
              </FormItem>

              <FormItem
                wrapperCol={{ span: 16 }}
                validateStatus={token.error=="username"?"error":""}
                help={token.error=="username"?token.hint:""}
              >
                <Input placeholder="UserName" onChange={this.UserChange.bind(this)}/>
              </FormItem>
              
              <FormItem                
    
                wrapperCol={{ span: 16 }}
                validateStatus={token.error=="password"?"error":""}
                help={token.error=="password"?token.hint:""}
              >
                
                <Input type="password" placeholder="Password" onChange= { this.PasswordChange.bind(this)}/>             
                               
              </FormItem>
        
              <FormItem
                
                wrapperCol={{ span:16 }}
              >

              <Button type="primary" id="login-btn" onClick={this.setAuth.bind(this)}>login</Button>
              
             
              </FormItem>
              
              <FormItem
                
                wrapperCol={{ span:16 }}
              >
              <Col span="12">
                <Checkbox className="login-label2">remember me</Checkbox>
              </Col>
              <Col span="12">
                <p className="login-label3">Can not login?</p>
              </Col>
              
              </FormItem>             

            </Form>
              </TabPane >

              <TabPane  tab="注册" key="2">
                <h3>个人信息</h3>
                <hr />
                <br />
                <Form horizontal className="reg-form">
                  <FormItem
                    label="工号:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                  >
                  <Input  ref="userId"/>
                  </FormItem>
                  <FormItem
                    label="姓名:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                  >
                  <Input  ref="name"/>
                  </FormItem>
                  <FormItem
                    label="密码:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                  >
                  <Input  ref="pass"/>
                  </FormItem>
                  <FormItem
                    label="职务:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                  >
                  <Input  ref="role"/>
                  </FormItem>     
                  <FormItem
                    label="当前等级:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    
                  >
                  <Select showSearch
                    placeholder="请输入你的当前等级"                   
                    onChange={this.currentLevel.bind(this)}                    
                    
                  >
                    <Option value="F0">F0</Option>
                    <Option value="F1">F1</Option>
                    <Option value="F2">F2</Option>
                    <Option value="F3">F3</Option>
                    <Option value="F4">F4</Option>
                  </Select>
                  </FormItem> 
                  <Button type="primary" className="reg-btn" onClick={this.saveCusInfo.bind(this)}>Register</Button>               
                  </Form>
                  </TabPane>
            </Tabs> 
          </div>        	
      );
    }
}
