
import React from "react";
import ReactDOM from "react-dom";
import DataItem from "./DataItem";
import {connect} from "react-redux";
import { Link } from "react-router";
import { setNodeDragable } from "../../interactScript";

@connect((store)=>{    
    return {
      pilot:store.pilotinfo
    };
    
})
export default class DataBlock extends React.Component {
    

    render() { 
    var DataItems;
  var topfive = [
  {ID:"1",
    NAME:"个人信息",
    length:"100"
  },
  {
    ID:"2",
    NAME:"晋升现状",
    length:"100"
  },
  {
    ID:"3",
    NAME:"消息",
    length:"100"
  },
  {
    ID:"4",
    NAME:"查看流程"
  },
  {
    ID:"5",
    NAME:"查看课程"
  },
  {
    ID:"6",
    NAME:"公司概况"
  }
  ];

  var dataselection=[
  {
    ID:"1",
    NAME:"FTDS",
    length:"100"
  },
    {
      ID:"2",
    NAME:"FDD",
    length:"100"
    }
  ]


var topfive1;
const {pilot} = this.props;
if(pilot.status == "INIT")
  {topfive1=topfive}
else if(pilot.status == "MODIFY")
  topfive1 = dataselection;

  if(topfive1.length>0)
  {
    DataItems = topfive1.map((item,i)=><DataItem title = {item.NAME} key = {i} uniquekey={item.ID} />);
  }
  else
  {
    DataItems = <h1> No Data Found</h1>
  }

        return (
          <div className="data-block" data-type="TITLE"> 
          <div className="data-title" >
            <span> 欢迎曹斌登录国航 </span>
          </div>
          { DataItems }
          </div>
      );
  }
}