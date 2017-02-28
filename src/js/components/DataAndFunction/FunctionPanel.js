import React from "react";
import { Button } from "antd";
import FunctionItem from "./FunctionItem";
import { ShowMainPanel,ShowEditPanel,ShowCreatePanel } from "../../Actions/KnowledgeAction";



export default class FunctionPanel extends React.Component {
    render() {


        return (
       <div className = "function-panel ">
         <FunctionItem text="创建" id="Create"/>
         <FunctionItem text="编辑" id="Edit"/>
         <FunctionItem text="删除" id="Delete"/>
          <div class="footer">
          <img src="../../img/sangtuosi.jpg"  width="100px" height="100px" />
       	  </div>
        </div>
      );
  }
}
