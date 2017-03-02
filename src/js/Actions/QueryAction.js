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

export function GetAllDocuments()
{
  
 return dispatch=>{
axios.get("http://localhost:8083/api/documents",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
          console.log(response.data)
          dispatch({type:"GET_ALL_DOCUMENTS",payload:response.data})
       })
   }
}

//kevin
export function updateDocumentXiaWen(data)
{
var data = {target:{"documentId":data.documentId},"updatepart":{xiawen_name:data.xiawen_name,xiawen_date:data.xiawen_date}}
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
             dispatch({type:"UPDATE_QUERY_DOCUMENT",payload:data})
             })
  }

}

export function UPDATE_PILOT_DATA_LEVEL(cert_id,pilot_data)
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
