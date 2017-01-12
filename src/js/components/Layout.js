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


//
import {GET_PILOT_DATA,GetCompanyAll} from "../Actions/pilotAction";


@connect((store)=>{    
    return {
        articles:store.pilot,
        auth:store.auth,
        Pilot:store.pilotinfo
    };
    
})
export default class Layout extends React.Component {




  componentWillUpdate(nextProps,nextState){
  /*  const {auth} = this.props;
 const {user} = auth.token ; 
    const {articles} = nextProps;
    if(articles.refresh ==true)
    {
      setTimeout(function(){

this.props.dispatch(fetchArticles(user))
      }.bind(this),1000)
      }
*/
  }


  componentWillMount()
  {


this.props.dispatch(GetCompanyAll());

  /*
const {auth} = this.props;

const {user} = auth.token ; 
this.props.dispatch(fetchArticles(user))*/
//this.props.dispatch(GET_PILOT_DATA())

  }


      render() {
        
    return (
         <div id="wrapper">

          <DataPanel> </DataPanel>
          <DisplayPanel articles = {this.props.articles}> </DisplayPanel>      
          <FunctionPanel> 
          </FunctionPanel>

        </div>
        
        
        
        
        
    );
  }
}