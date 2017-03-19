import axios from "axios"
import { Modal } from 'antd';


//get level info 



export function GetCurrentLevelInfo(level)
{

if(!level)
{
  return 1;
}
return dispatch=>{
    axios.get("http://localhost:8083/api/levels?level="+level,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
      let data = response.data;
        dispatch({type:"FETCH_LEVEL_INFO",payload:data})    
     })
  
    }

}



//pilot actions for information
export function GET_PILOT_DATA(data)
{
if(!data)
{
  data = 1
}
	 return dispatch=>{
    axios.get("http://localhost:8083/api/pilots?cert_id="+data,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {

    	console.log(response.data)
    	var data = response.data[0];
        dispatch({type:"FETCH_PILOT_INFO",payload:data})    
 		 })
  
    }
}

export function UPDATE_PILOT_DATA(cert_id,pilot_data)
{

  var data={

    "target":{"cert_id":cert_id},
    "updatepart":pilot_data
  }
   return dispatch=>{
axios.put("http://localhost:8083/api/pilots",{
       data:data,
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
        dispatch({type:"UPDATE_PILOT_DATA",payload:pilot_data})    
     })
   }
}

export function UPDATE_OTHER_PILOT_DATA(cert_id,pilot_data)
{

  var data={

    "target":{"cert_id":cert_id},
    "updatepart":pilot_data
  }
   return dispatch=>{
axios.put("http://localhost:8083/api/pilots",{
       data:data,
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {  
     })
   }
}


export function UPDATE_PILOT_FLIGHT(target)
{

  return dispatch=>{
    axios.put("http://localhost:8083/api/flightUpdate",{
      data:target,
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
  
      const {data} = response;

      if(data!="no")
          dispatch({type:"UPDATE_PILOT_FLIGHT",payload:response.data})    
     
     })
  }
}



//end of pilot information




//Company infos

export function GetCompanyAll()
{
  return dispatch=>{
    axios.get("http://localhost:8083/api/companys",{
                           headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
                    }).then(function(response,err){

                      var data = response.data;
                      dispatch({type:"GET_COMPANY_ALL",payload:data})

                    })
  }

}
export function CreateCompany(data)
{
  return dispatch=>{
              axios.post("http://localhost:8083/api/companys",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                dispatch({type:"CREATE_COMPANY",payload:data})

              })

}
}


export function SubmitMessage(data)
{
  return dispatch=>{
      axios.post("http://localhost:8083/api/message",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                const modal = Modal.success({
                title: '提交成功',
                content: '提交成功',
               });
                // dispatch({type:"CREATE_COMPANY",payload:data})

              })
  }
}


export function SubmitMessageForXiaWen(data)
{
  return dispatch=>{
      axios.post("http://localhost:8083/api/message",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                   })
  }
}


export function FetchMessage(cert_id)
{

  let url = "http://localhost:8083/api/message";
  if(cert_id)
  {
    url = url + "?applierId=" + cert_id;
  }
  
  return dispatch=>{
    axios.get(url,{
                   headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
                    }).then(function(response,err){

                      var data = response.data;
                      console.log("data",data);
                      dispatch({type:"FETCH_MESSAGE",payload:data})
                    })

  }
}




export function UpdateMess(para)
{
var data={
    "target":{"message_id":para.message_id},
    "updatepart":para
  }
  return dispatch =>{
    axios.put("http://localhost:8083/api/message",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
               
               dispatch({type:"UPDATE_MESSAGE",payload:response.data})

              })
  }
}
/*
export function UpdateMessage(data1)
{
  var data={
    "target":{"message_id":data1.message_id},
    "updatepart":{"owner":data1.owner}
  }
    console.log("data is +++++",data)

  return dispatch =>{
    axios.put("http://localhost:8083/api/message",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"UPDATE_MESSAGE",payload:data1})
  })
  }
}
*/
/*

export function UpdateMessage1(data1)
{
  var data={
    "target":{"message_id":data1.message_id},
    "updatepart":{"status":data1.status}
  }

  return dispatch =>{
    axios.put("http://localhost:8083/api/message",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"UPDATE_MESSAGE1",payload:data1})
  })
  }
}

export function UpdateMessage2(data1)
{
  var data={
    "target":{"message_id":data1.message_id},
    "updatepart":{"description":data1.description}
  }

  return dispatch =>{
    axios.put("http://localhost:8083/api/message",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"UPDATE_MESSAGE2",payload:data1})
  })
  }
}
*/


export function updateDocument(data)
{
  var data={
    "target":{"documentId":data.documentId},
    "updatepart":{"steps":data.steps}
  }

  return dispatch =>{
    axios.put("http://localhost:8083/api/documents",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"UPDATE_DOCUMENT",payload:data})
  })
  }
}


export function updateDocument1(data)
{
  var data={
    "target":{"documentId":data.documentId},
    "updatepart":{"status":data.status}
  }

  return dispatch =>{
    axios.put("http://localhost:8083/api/documents",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"UPDATE_DOCUMENT1",payload:data})
  })
  }
}

export function DeleteCompany(data)
{

  return dispatch=>{

    axios.delete("http://localhost:8083/api/companys",{
                      data:{company_id:data.company_id},
                      headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
    })
    .then(function(){
    dispatch({type:"DELETE_COMPANY",payload:data})  

    })
  }
}



export function EditCompany(data){
  return dispatch=>{

       axios.put("http://localhost:8083/api/companys",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"EDIT_COMPANY",payload:data.updatepart})

              })


  }
}


export function ChangeWorkFlow(data){
  return dispatch=>{
       axios.put("http://localhost:8083/api/workflows",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"CHANGE_WORKFLOW",payload:data.updatepart})
              })


  }
}


//end of Companys


export function AddCardToDisplay(test)
{ 

console.log(test)
  return dispatch=>{

    dispatch({type:"Add_Card_To_Display",payload:test})

  }
}


export function RemoveCard(data)
{
 
 return dispatch=>{

  dispatch({type:"Remove_Card",payload:data})
 }
}

export function ChangeStyle()
{
  var content = document.getElementById('content');
    content.classList.add('content-' + Math.floor(Math.random() * 3));
}

export function ChangeWorkflow()
{

  return dispatch=>{
    dispatch({type:"OPEN_WORKFLOW_PANEL"})

  }
}

export function DeleteWorkflowForm(workflowid)
{
  return dispatch=>{
    axios.delete("http://localhost:8083/api/workflows",{
                      data:{workflow_id:workflowid},
                      headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
    })
    .then(function(){
    dispatch({type:"DELETE_WORKFLOW_FORM",payload:workflowid})  

    })


  }
}

export function ChangeToModify(workflowid)
{
   return dispatch=>{
    dispatch({type:"CHANGE_TO_MODIFY",payload:workflowid});
    }
}


//Courses actions

export function GET_ALL_COURSES(){

   return dispatch=>{
    axios.get("http://localhost:8083/api/courses",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
      console.log(response)
        dispatch({type:"FETCH_COURSES_ALL",payload:response.data})    
     })
  
    }
}

export function GetTargetCourse(data){

   return dispatch=>{

  dispatch({type:"GETING_TARGET_COURCE",payload:{loading:true}})  

    axios.get("http://localhost:8083/api/courses?course_id="+data.course_id,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
      console.log(response)
        dispatch({type:"GETING_TARGET_COURCE",payload:{loading:false,data:response.data}})    
     })
  
    }
}
export function CreateNewCourse(data){

      return dispatch=>{
              axios.post("http://localhost:8083/api/courses",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                dispatch({type:"CREATE_COURSE",payload:data})

              })

}
}

export function EditCourse(data)
{
  return dispatch=>{

       axios.put("http://localhost:8083/api/courses",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
             dispatch({type:"EDIT_COURSE",payload:data.updatepart})

              })


  }


}

export function DeleteCourse(ddata){

  return dispatch=>{

    axios.delete("http://localhost:8083/api/courses",{
                      data:ddata,
                      headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
    })
    .then(function(){
    dispatch({type:"DELETE_COURSE",payload:ddata})  

    })


  }
}



//end of Courses action 



export function AddCourseToStep(courseTitle,workflowid,stepSequence,courseid){
  return dispatch=>{
    dispatch({type:"ADD_COURSE_TO_STEP",payload:courseTitle,payload1:workflowid,payload2:stepSequence,payload3:courseid})
  }
}

export function ChangeStepSequence(steps,workflowid){
  return dispatch=>{
    dispatch({type:"CHANGE_STEP_SEQUENCE",payload:steps,payload1:workflowid})
  }
}

export function DeleteCourseFromStep(workflowid,stepSequence,courseid)
{
  return dispatch=>{
    dispatch({type:"DELETE_COURSE_FROM_STEP",payload:workflowid,payload1:stepSequence,payload2:courseid})
  }
}

export function SaveStepsSequence(currentWorkflow,steps)
{
  // console.log("currentWorkflow,steps are",currentWorkflow,steps);
  var data={
    "target":{"workflow_id":currentWorkflow},
    "updatepart":{"steps":steps}
  }
   return dispatch=>{
    axios.put("http://localhost:8083/api/workflows",{
       data:data,
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
      dispatch({type:"SAVE_STEPS_SEQUENCE",currentWorkflow:currentWorkflow,steps:steps})
     })
   }
}

export function AddNewWorkFlow(newWorkflow)
{
  var config = {
  headers:{"Access-Control-Allow-Origin":"*",}
  }
   return dispatch=>{
      axios.post("http://localhost:8083/api/workflows",newWorkflow,config).then(function (response,err) {
      console.log(response)
      if(response.status == 200)
        dispatch({type:"ADD_NEW_WORK_FLOW",payload:newWorkflow})
     }) 
    }
}

export function InitialWorkflows()
{
  var config = {
  headers:{"Access-Control-Allow-Origin":"*",}
  }
   return dispatch=>{
      axios.get("http://localhost:8083/api/workflows"
        ,config).then(function(response,err) {
      console.log("Initial response is",response);
      if(response.status == 200);
         dispatch({type:"INITIAL_WORKFLOWS",payload:response.data})
     }) 
    }
}

export function DeleteStepFromWorkflow(workflowid,stepSequence)
{
  return dispatch =>{
    dispatch({type:"DELETE_STEP_FROM_WORKFLOW",payload:workflowid,payload1:stepSequence})
  }
}
export function AddNewStep(stepName,workflowid)
{
  return dispatch =>{
    dispatch({type:"ADD_NEW_STEP",payload:stepName,payload1:workflowid})
  }
}





//levels action 

export function GetLevels()
{
     return dispatch=>{
axios.get("http://localhost:8083/api/levels",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
      var data = response.data;
      console.log(response.data);
        dispatch({type:"GET_LEVELS",payload:data})    
     })
   }


}

 export function upsertLevel(data)
 {
   return dispatch=>{
axios.put("http://localhost:8083/api/levels",{
       data:data,
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
        dispatch({type:"UPSERT_LEVEL",payload:data})    
     })
   }

 }
//end of levels action 


//workflow action kevin


export function GetWorkflows(data)
{

    axios.get("http://localhost:8083/api/workflows",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
      var data = response.data;   
      return data; 
     })

}




//end of workflow

//Documents

export function GetDocumnts(cert_id)
{
  if(cert_id==null)
  {
    cert_id = "?";
  }
 return dispatch=>{
axios.get("http://localhost:8083/api/documents"+cert_id,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
          console.log(response.data)
          dispatch({type:"GET_USER_DOCUMENTS",payload:response.data})
       })
   }
}


export function CreateDocument(data)
{

      return dispatch=>{
              axios.post("http://localhost:8083/api/documents",{
                     data:data,
                     headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
              })
              .then(function(response,err)
              {
                dispatch({type:"CREATE_DOCUMENT",payload:data})

              })

}



}


//end of documents