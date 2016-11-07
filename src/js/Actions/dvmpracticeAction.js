import axios from "axios";
import { Modal } from 'antd';



export function GetAlltheDVM(user){
    return dispatch=>{
    axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        },
    auth: {
    username: 'zengheng',
    password: 'Sap12345'
     }
    })
    .then(function (response,err) {
        var data = response.data.d;
        console.log(data);
        dispatch({type:"FETCHDVM",payload:data})    
  })
  
    }
    
    
}

export function updateDVM(data)
{


    console.log(data)
    return dispatch=>{
    axios.put("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE("+data.FACTOR_GUID+")",data,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        },
    auth: {
    username: 'zengheng',
    password: 'Sap12345'
     }
    })
    .then(function (response,err) {
console.log(response)

if(response.status==204)
{  
    const modal = Modal.success({
              title: 'Successfully create! ',
              content: 'The article is updated',
            });

        dispatch({type:"UPDATESUCCESS",payload:data})    


}


  })

  
    }

}