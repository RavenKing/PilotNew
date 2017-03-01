import { combineReducers } from "redux"


import auth from "./authReducer"
import pilotinfo from "./PilotReducer"
import query from "./QueryReducer"

export default combineReducers({
    auth,
    pilotinfo,
    query
    
    
})