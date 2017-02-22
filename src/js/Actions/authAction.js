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
    console.log("data is ",parameter);
    if(!parameter.cert_id){
      var data = {
          authorized:false,
          error:"customer_id",
          hint:"input customer id",
          user:null
      };
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
    
    axios.post("http://localhost:8083/api/pilots",{
        cert_id:cert_id,
        name:name,
        password:password,
        role:'ADM'
    },config).then(function(response){
      if(response.status == 200){
        const modal = Modal.success({
              title: '注册成功 ',
              content: '请登录',
            });
      browserHistory.push("/")                  }
      }).catch(function (error) {
    console.log("error is",error);
  });


  }
}

export function UserRegister(data){
  return dispatch=>{

    var userId = data.userId;    
    var name = data.name; 
    var pass = data.pass;
    var role = data.role;
    var currentLevel = data.currentLevel;
    var token={};
    //request configuration
    var config = {
      headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        },
      auth: {
        username: 'zengheng',
        password: 'Sap12345'
      }
    };

    axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/CUST?$filter=CUSTOMER_ID eq "+customer_id,
      config).then(function(response){
        if(response.data.d.results.length > 0){
          //check user name whether exists
    axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$filter=USERNAME eq '"+username+"'",
      config
      ).then(function(response){
        if(response.data.d.results.length > 0){
          token = {
            authorized:false,
            user:null,
            error:"username",
            hint:"username already exists"
          }
          dispatch({type:"REG_CHECK",payload:token});
         
        }
        else{
          axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$orderby=USER_ID desc&top=1",
          config).then(function(response){
              
              var user_id = response.data.d.results[0].USER_ID;
              user_id = Number(user_id + 1);
              user_id = user_id.toString();

              axios.post("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users",{

                  USER_ID:user_id,
                  CUSTOMER_ID:customer_id,
                  PASSWORD:pwd,
                  USERNAME:username,
                  ROLE:role
              },
              config).then(function(response){             
                  token = {
                      error:"",
                      hint:""
                  };
                  dispatch({type:"REG_CHECK",payload:token});
                  const modal = Modal.success({
                        title: 'Successfully register! ',
                        content: 'You have regitered done',
                  });

              }).catch(function(response){
                    console.log(response);
              })
                
              
    
          }).catch(function(response){
            console.log(response);
          })




        }
       
      }).catch(function(response){
        console.log(response);
      })

        }
        //customer id does not exist
        else{
          token = {
            authorized:false,
            user:null,
            error:"usr_cus_id",
            hint:"customer id does not exists"
          }
          dispatch({type:"REG_CHECK",payload:token});
        }
      }).catch(function(response){
        console.log(response);
      })    
  }
}