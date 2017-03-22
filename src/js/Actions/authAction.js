import md5 from 'js-md5';

const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
const AUTH_DELETE_TOKEN = 'AUTH_DELETE_TOKEN'
import axios from "axios"
import { Modal } from 'antd';

import { browserHistory,Router } from "react-router";

export function setAuthToken (parameter) {
  var config = {
  headers:{"Access-Control-Allow-Origin":"*",}
  }
return dispatch=>{
    if(!parameter.cert_id){
      var data = {
          authorized:false,
          error:"customer_id",
          hint:"input customer id",
          user:null
      };
      console.log("did");
      dispatch({type:"AUTH_SET_TOKEN",payload:data});
    }
    else{
        
      var cert_id = parameter.cert_id;
      var password = md5(parameter.password);
      axios.post("http://localhost:8083/api/login",{
        cert_id:cert_id,
        password:password
    },config).then(function(response){

      if(response.status == 200){
        console.log("response is ",response)
        if(response.data == "未找到该用户")
        {
          const modal = Modal.success({
              title: '未找到该用户 ',
              content: '未找到该用户',
            });
        }else{
          if(response.data == "密码错误")
            {const modal = Modal.success({
              title: '密码错误 ',
              content: '密码错误',
            });
        }
        else
        {
        var data = {
          authorized:true,
          user:{
              USERNAME:response.data.name,
              cert_id:response.data.cert_id,
              ROLE:response.data.role
             },
             hint:"logged"
        }
        dispatch({type:"AUTH_SET_TOKEN",payload:data});
        const modal = Modal.success({
              title: '登录成功 ',
              content: '登录成功',
            });
      browserHistory.push("/")  
          }
        }
      }
      }).catch(function (error) {
    console.log("error is",error);
  });

  }
  }
}


export function LogOut (parameter) {
  var config = {
  headers:{"Access-Control-Allow-Origin":"*",}
  }
return dispatch=>{
      var data = {
          authorized:false,
          error:"LogOut",
          hint:"已登出",
          user:null
      };
      console.log("did");
      dispatch({type:"AUTH_SET_TOKEN",payload:data});
    

  }
 }

export function invalidateAuthToken () {
  window.localStorage.removeItem('authToken')
  return {
    type: AUTH_DELETE_TOKEN
    
  }
}
//check the registering data
export function regCheck(data){
  return dispatch=>{
    dispatch({type:"REG_CHECK",payload:data})
  }
}



export function personalInfoRegister(data){


  var config = {
  headers:{"Access-Control-Allow-Origin":"*",}
  }
  return dispatch=>{
    var cert_id = data.cert_id;
    var name = data.name;    
    var password = md5(data.password);
    
    axios.post("http://localhost:8083/api/pilotslogin",{
        cert_id:cert_id,
        name:name,
        password:password,
        role:'Pilot'
    },config).then(function(response){
      if(response.status == 200){
        console.log(response);

      if(response.data.result == "done")
        {const modal = Modal.success({
              title: '注册成功 ',
              content: '请登录',
            });}
      else if(response.data.result == "already" )
      {
const modal = Modal.error({
              title: '已有人注册 ',
              content: '已有人注册',
            });

      }
      browserHistory.push("/")                  }
      }).catch(function (error) {
    console.log("error is",error);
  });


  }
}
