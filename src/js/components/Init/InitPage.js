import React from "react";
import { connect } from "react-redux";
import { History,Router } from "react-router";
import { Form, Input, Button, Checkbox,Col,Tabs,Select } from 'antd';
import md5 from "md5-js"
import {  UPDATE_OTHER_PILOT_DATA,upsertLevel} from "../../Actions/pilotAction"

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

@connect((store)=>{
    
    return {
      	auth:store.auth
    };
    
})
export default class Login extends React.Component {
  

      InitPilot()
      {
     var newlevel = {
        name:"default",
        inuse:true,
        modify_time:Date.now(),
        modifyer:"001",
        entries:{
          flight_base:0,
          flight_factor:1,
          level:'F0',
          description:'F0'
        }
     };

    var constructdata = {
      target:{name:"default"},
      updatepart:newlevel
    }
     this.props.dispatch(upsertLevel(constructdata));
        this.props.dispatch(UPDATE_OTHER_PILOT_DATA('001',{role:'ADM'}));
      }
     render() {

      
      return  (
      
      
          <div className="login">
              <Button onClick={this.InitPilot.bind(this)}>Initialization</Button>
          </div>        	
      );
    }
}
