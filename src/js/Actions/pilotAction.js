import axios from "axios"

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

export function SaveStepsSequence()
{
  return dispatch =>{
    dispatch({type:"SAVE_STEPS_SEQUENCE"})
  }
}

export function AddNewWorkFlow(newWorkflow)
{
  return dispatch =>{
    dispatch({type:"ADD_NEW_WORK_FLOW",payload:newWorkflow})
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


