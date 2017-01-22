export default function query (
  state = {
    pilots:[]
  }, action
) {
  switch (action.type) {
    case "GET_RESULTS_PILOTS":{
      
      return {...state,pilots:action.payload}
    }
    default:{

      return state
    }
  }
}