import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Button,Table,Card,Icon,Form,Modal} from "antd";



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



////



  render() {
    const {company} = this.props;
    console.log(company)

    const columns= [
{
  title: '部门',
  dataIndex: 'name',
  key: 'name',
},
]
        return (
        <div>
        <h1>{company.company_name}</h1>
        <Table columns={columns} dataSource={company.departments}  pagination={false}/>
        </div>
      );
  }

}