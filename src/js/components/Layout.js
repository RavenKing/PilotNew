import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

//Knowledge Action

//Antd
import 'antd/dist/antd.css';
import { Button, DatePicker } from "antd";


//high charts
import  ReactHighCharts  from "react-highcharts";

//Three Panels

import DataPanel from "./DataAndFunction/DataPanel";
import FunctionPanel from "./DataAndFunction/FunctionPanel";
import DisplayPanel from "./DisplayPanel/DisplayPanel"

import {GetAllDocuments} from "../Actions/QueryAction";

//
import {GET_PILOT_DATA,GetCompanyAll,GET_ALL_COURSES,GetLevels,GetWorkflows,InitialWorkflows,GetDocumnts} from "../Actions/pilotAction";


@connect((store)=>{    
    return {
        auth:store.auth,
        Pilot:store.pilotinfo
    };
    
})
export default class Layout extends React.Component {


  componentWillMount()
  {
const {auth} = this.props;
//set up the data admin
console.log(this.props.Pilot);
this.props.dispatch(GetCompanyAll());
this.props.dispatch(GET_ALL_COURSES());
this.props.dispatch(GetLevels());
this.props.dispatch(InitialWorkflows());
this.props.dispatch(GetDocumnts("?cert_id="+auth.token.user.cert_id));
this.props.dispatch(GetAllDocuments());


  }


      render() {
        
    return (
         <div id="wrapper">

          <DataPanel> </DataPanel>
          <DisplayPanel> </DisplayPanel>      
          <FunctionPanel> 
          </FunctionPanel>
          </div>
        
        
        
        
        
    );
  }
}