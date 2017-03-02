export default function query (
  state = {
    pilots:[],
    AllDocuments:[]
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
    case "GET_TARGET_WORKFLOWS":{
      const newpilots = state.pilots.filter((pilot)=>{if(pilot.cert_id==action.payload.cert_id) pilot.Workflows = action.payload.workflows; return pilot;})
      return {...state,pilots:newpilots};
    }
    case "GET_ALL_DOCUMENTS":{
      return {...state,AllDocuments:action.payload}
    }
    case "UPDATE_QUERY_DOCUMENT":{


      const {AllDocuments} =state ;

      const newDocuments= AllDocuments.filter((one)=>{
        if(one.documentId == action.payload.documentId)
        {
          one=action.payload
        }
        return one;
      })

      return {...state,AllDocuments:newDocuments}

    }
    default:{

      return state
    }
  }
}