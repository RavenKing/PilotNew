import axios from "axios"


export function GET_PILOT_DATA()
{
	 return dispatch=>{
    axios.get("http://localhost:8083/api/pilots?id=I011111",{
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

export function DeleteTest()
{
  return dispatch=>{
    dispatch({type:"DELETE_TEST"})
  }


}

export function CreateCompany(data)
{ 
return dispatch=>{
  dispatch({type:"CREATE_COMPANY",payload:data})
}

}

export function EditCompany(data){

  return dispatch=>{
    dispatch({type:"EDIT_COMPANY",payload:data})
  }



}