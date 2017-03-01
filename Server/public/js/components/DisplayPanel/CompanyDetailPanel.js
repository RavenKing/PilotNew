import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {Tag} from "antd"

export default class CompanyDetail extends React.Component { 
  
////



  render() {
    const {company} = this.props;  
  const departmentsdisplay = company.departments.map((department)=><Tag key={department.name} >{department.name}</Tag>);




        return (
        <div>
        <h1>公司名称：{company.company_name}</h1>
        <hr />
        <h2>部门列表</h2>
          {departmentsdisplay}
        </div>
      );
  }

}