import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,IndexRoute,hashHistory,browserHistory} from "react-router";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/Login/login"
import requireAuth from "./requireAuth";
import  ReactHighCharts  from "react-highcharts";


const app = document.getElementById('app');
ReactDOM.render(
    <Provider store = {store}>
    <Router history={hashHistory}>
     <Route path="/login" component ={Login}> </Route>  
     <Route path="/" component ={requireAuth(Layout)}> 
      </Route>
  </Router>
    </Provider>,
app);