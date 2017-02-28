import axios from "axios"
//pilot actions for information


export function DeletePilot(cert_id)
{


return dispatch=>{

    axios.delete("http://localhost:8083/api/pilots",{
                      data:{target:{cert_id:cert_id}},
                      headers:{
                      'X-My-Custom-Header': 'Header-Value',
                      'content-type':'application/json'
                      }
    })
    .then(function(){
    dispatch({type:"DELETE_PILOT",payload:cert_id})  
    })
  }


}


export function GetQueryResults(data)
{

	 return dispatch=>{
    axios.post("http://localhost:8083/api/pilots/query",{
      data:data,
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
        const pilots= response.data;
        dispatch({type:"GET_RESULTS_PILOTS",payload:pilots})    
 		 })
  
    }
}

export function GetWorkFlowById(cert_id)
{
 if(cert_id==null)
  {
    cert_id = "";
  }
 return dispatch=>{
axios.get("http://localhost:8083/api/documents?cert_id="+cert_id.toString(),{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
          console.log(response.data)
          let paydata = {cert_id:cert_id,workflows:response.data}
          dispatch({type:"GET_TARGET_WORKFLOWS",payload:paydata})
       })
   }




}