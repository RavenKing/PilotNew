import { combineReducers } from "redux"


import auth from "./authReducer"
import loginuser from "./usersReducer"
import pilotinfo from "./PilotReducer"

export default combineReducers({
    auth,
    pilotinfo
    
    
})