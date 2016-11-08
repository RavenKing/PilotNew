export default function reducer(state={
    user:{

    },fetching:false,
    fetched:false,
    error:null,
    },action){
    
    switch(action.type)
        {
                
            case "Initial":{
                return {result:"Initial"}
            }
            case "FETCH_USER":
                { 
                 return {...state,fetching:true} 
                 
                }
            case "FETCH_USER_FULFILLED":{
            return {...state,fetching:false,fetched:true,user:action.payload,}
        }          
        } 
        return state;
}