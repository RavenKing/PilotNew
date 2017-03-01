
import React from "react";
import ReactDOM from "react-dom";
import DataItem from "./DataItem";
import {connect} from "react-redux";
import { Link } from "react-router";
import { setNodeDragable } from "../../interactScript";

@connect((store)=>{    
    return {
      auth:store.auth,
      pilot:store.pilotinfo

    };
    
})
export default class DataBlock extends React.Component {

  
onDrop(e){
  console.log("onDrop sucess here");
}  

    render() { 

      var Role;
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
    NAME:"查看转升流程"
  },
  {
    ID:"5",
    NAME:"查看课程"
  },
  {
    ID:"6",
    NAME:"公司概况"
  },
  {
      ID:"7",
      NAME:"等级设置"
  },  
  {
      ID:"8",
      NAME:"搜索系统"
  },
  {
    ID:"10",
    NAME:"更新飞行信息"
  }
  ];

  var PilotDataBlock = [
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
// console.log("what is the props in datablock",this.props);
var role = this.props.auth.token.user.ROLE;
console.log("let us see the role",role);
var courses = pilot.Courses;
if(role == "Pilot")
{
  Role = "飞行员";
  if(pilot.status == "INIT")
    {
      topfive1=PilotDataBlock;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="data-item" title = {item.NAME} key = {i} uniquekey={item.ID}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
      }

    }
    else if(pilot.status == "MODIFY"){
      topfive1 = courses;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="course-item" title = {item.title} key = {i} uniquekey={item.ID} courseid = {item.course_id}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
       }
      }
}
if(role == "INS")
{
    Role = "检察员";

  if(pilot.status == "INIT")
    {
      topfive1=PilotDataBlock;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="data-item" title = {item.NAME} key = {i} uniquekey={item.ID}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
      }

    }
    else if(pilot.status == "MODIFY"){
      topfive1 = courses;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="course-item" title = {item.title} key = {i} uniquekey={item.ID} courseid = {item.course_id}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
       }
      }
}
if(role == "AUD")
{
  if(pilot.status == "INIT")
    {
      topfive1=PilotDataBlock;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="data-item" title = {item.NAME} key = {i} uniquekey={item.ID}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
      }

    }
    else if(pilot.status == "MODIFY"){
      topfive1 = courses;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="course-item" title = {item.title} key = {i} uniquekey={item.ID} courseid = {item.course_id}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
       }
      }
}
if(role == "ADM")
{
      Role = "管理员";

    if(pilot.status == "INIT")
    {
      topfive1=topfive;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="data-item" title = {item.NAME} key = {i} uniquekey={item.ID}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
      }

    }
    else if(pilot.status == "MODIFY"){
      topfive1 = courses;
      if(topfive1.length>0)
      {
        DataItems = topfive1.map((item,i)=><DataItem className="course-item" title = {item.title} key = {i} uniquekey={item.ID} courseid = {item.course_id}/>);
      }
      else
      {
        DataItems = <h1> No Data Found</h1>
       }
      }
}

let Name="test user";
console.log(pilot)
if(pilot.Pilot)
if(pilot.Pilot.name)
  {Name = pilot.Pilot.name}
// console.log("欢迎登录",this.props.pilot.Pilot.name);
return(
  <div className="data-block" data-type="TITLE"> 
    <div className="data-title" >
      <span> 欢迎登录<br/>国航晋升系统 <br/>
      {Role+":" + Name}</span>
    </div>
      { DataItems }
  </div>
);
}
}