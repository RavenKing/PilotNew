import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal,Tag} from "antd";



@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
    };
    
})
export default class CompanyDetail extends React.Component { 
  constructor(props)
  {
      super(props)

      this.state={company:this.props.company}
  }

 onClose(){}


////



  render() {
    const {company} = this.props;  
    const columns= [
{
  title: '名字',
  dataIndex: 'name',
  key: 'name',
},
{
  title: '职级',
  dataIndex: 'level.current_level',
  key: 'level.current_level',
},
{
  title: '目标职级',
  dataIndex: 'level.target_level',
  key: 'level.target_level',
},
{
  title: '飞行时间（小时)',
  dataIndex: 'flightinfo.flightTime',
  key: 'flightinfo.flightTime',
},
{
  title: '飞行航段(个)',
  dataIndex: 'flightinfo.flightRoute',
  key: 'flightinfo.flightRoute',
},
{
  title: '用户等级',
  dataIndex: 'role',
  key: 'role',
},
{
  title: '升级因素',
  dataIndex: 'upgrade_factor',
  key: 'upgrade_factor',
}
] ; 
    const sourcedata = {Pilots:[
        {
            userid:"1",
            username:"caobin",
            name:"曹斌",
            password:"test",
            role:"ADM",
            level:{
              current_level:"F0",
              target_level:"F1"
            },
            flightinfo:{
              flightTime:900,
              flightRoute:100
            },
            department:"国航第九飞行编队",
            company_id:"SH1001",
            company:"国航上海分公司",
            create_time:"2016-07-07",
            upgrade_factor:1.2
        },
        {
            userid:"2",
            username:"liuge",
            name:"柳哥",
            password:"test",
            role:"ADM",
            level:{
              current_level:"F2",
              target_level:"F3"
            },
            flightinfo:{
              flightTime:1000,
              flightRoute:102
            },
            department:"国航第九飞行编队",
            company_id:"SH1001",
            company:"国航上海分公司",
            create_time:"2016-07-07",
            upgrade_factor:1.1
        }
      ] };



  const departmentsdisplay = company.departments.map((department)=><Tag key={department.name} onClose={this.onClose.bind(this)}>{department.name}</Tag>);




        return (
        <div>
        <h1>{company.company_name}</h1>
        
          {departmentsdisplay}
        <Table columns={columns} dataSource={sourcedata.Pilots}  pagination={false}/>
        </div>
      );
  }

}