import React from "react";
import { Button,Modal } from "antd";
import FunctionItem from "./FunctionItem";
import {connect} from "react-redux";
import { hashHistory,Router,Link,Route,Redirect  } from "react-router";

@connect((store)=>{    
    return {
      auth:store.auth,
    };
    
})
export default class FunctionPanel extends React.Component {
    


    render() {

      const {auth} = this.props;

      console.log(auth.token.user)
   var displaypart
      if(auth.token.user.ROLE=="ADM")
   displaypart = 
         <div><FunctionItem text="创建" id="Create"/>
         <FunctionItem text="编辑" id="Edit"/>
         <FunctionItem text="删除" id="Delete"/>
          </div>
        else 
          displaypart = <div></div>
        return (
        <div className = "function-panel ">
           <Button className="func-item1 ant-btn ant-btn-ghost ant-btn-lg function-button draggable" data-type="ANALYSIS" type="ghost" data-id="logout">
                <Link to="/login">登出</Link>
              </Button>

          {displaypart}
                <div class="footer">
          <img src="../../img/sangtuosi.jpg"  width="100px" height="100px" />
          </div>
        </div>
      );
  }
}
