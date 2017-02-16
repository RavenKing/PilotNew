export default function query (
  state = {
    pilots:[]
  }, action
) {
  switch (action.type) {
    case "GET_RESULTS_PILOTS":{
      
      return {...state,pilots:action.payload}
    }
    case "DELETE_PILOT":{
      const newpilots= state.pilots.filter((pilot)=>{if(pilot.cert_id!=action.payload)return pilot});
      return{...state,pilots:newpilots};
    }

    default:{

      return state
    }
  }
}