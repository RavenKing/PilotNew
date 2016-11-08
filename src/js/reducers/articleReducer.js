export default function reducer(state={
    personalInfo:[],
    articles:[],
    fetching:false,
    fetched:false,
    showPersonnal:false,
    showMain:false,
    showCreate:false,
    refresh:false,
    newArticle:{currentstep:0},
    showEdit:false,
    updateArticle:null,
    displayPanel:[],
    error:null
    },action){
    
    switch(action.type)
    {
        case "GET_PERSONNAL_INFO":
        {
            return {...state,personalInfo:action.payload}
        }
        case "OPEN_PERSONNAL_PANEL":{

            return {...state,showPersonnal:true}
        }

        case "CLOSE_PERSONNAL_PANEL":{

            return {...state,showPersonnal:false}
        }

        case "FETCH_ARTICLE_FULFILLED":
        {
                    
            return {...state,fetching:false,fetched:true,articles:action.payload,refresh:false}
        }
        case "SHOW_ARTICLE_MAIN":
        {
            return  {...state,showMain:true}

        }
        case "SHOW_EDIT_PANEL":
        {
            var { updateArticle } = state;

            updateArticle = {};
            updateArticle.article_id = action.payload;
            return {...state,showEdit:true,updateArticle:updateArticle}
        }
        case "CLOSE_EDIT_PANEL":
        {            
            return {...state,updateArticle:null,showEdit:false}
        }
        case  "CLOSE_ARTICLE_MAIN":
        { 
            return {...state,showMain:false}
        }  
       
        case "ADD_ARTICLE_VIEW":
        {
            const  { displayPanel } = state;

            displayPanel.push({
                add_articlea:action.payload.data_id,
                x:action.payload.x,
                y:action.payload.y,
                visible:true});
            return{...state,displayPanel:displayPanel}
        }
        case "REMOVE_ARTICLE_VIEW":
        {
            const { displayPanel } = state;

            var newdata = displayPanel.filter((displayone)=>{ 
                       
                return  displayone.article != action.payload
                      
            })

            return {...state,displayPanel:newdata,refresh:true}

        }
        case "SHOW_CREATE_PANEL":
        {
            return {...state,showCreate:true}
        }
        case "CLOSE_CREATE_PANEL":{
            const { newArticle } = state;
            if(newArticle.currentstep){
            newArticle.currentstep = 0;
            }
            else{

            }   
            return {...state,showCreate:false,newArticle:newArticle}
        }
        case "NEW_ARTICLE_STEP_ONE":{

           return {...state,newArticle:action.payload}

        }
        case "ADD_ONE_STEP":{
            const { newArticle } = state;
            newArticle.currentstep = newArticle.currentstep + 1 ; 
            return {...state,newArticle:newArticle}
        }

        case "BACT_ONE_STEP":
         {
                const { newArticle } = state;
                newArticle.currentstep = newArticle.currentstep - 1 ; 
                return {...state,newArticle:newArticle}

         }
         case "GET_BEST_PRACTICE":
         {
            const { articles  } = state;
            
            const { results } = articles;
            var newdata = results.filter((article)=>{ 
                if(article.ARTICLE_ID == action.payload.articleid){
                    if(article.bestpractice){
                    article.bestpractice.AVGS = action.payload.AVGS;
                   article.bestpractice.Retention=action.payload.Retention;}
                   else{
                    article.bestpractice={
                        AVGS:action.payload.AVGS,
                        Retention:action.payload.Retention
                    }
                   }
                }
                       
                return  article;
                      
            });
            var newArticles = {};
            newArticles.results = newdata;
            return {...state,articles:newArticles};
        }
        case "GET_BEST_PRACTICE_STEP2":
        {

            console.log(action.payload)
            const { articles  } = state;
            const { results } = articles;
            var newdata = results.filter((article)=>{ 
                if(article.ARTICLE_ID == action.payload.articleid){
                    if(article.bestpractice){
                        
                        article.bestpractice.detail = action.payload.result
                    }
                    else{
                        
                        article.bestpractice={detail:action.payload.result}

                    }
                }
                       
                return  article;
                      
            });
            var newArticles = {};
            newArticles.results = newdata;
            return {...state,articles:newArticles};
        }
        case "GET_PRACTICES":
        {
            var {newArticle} = state;
            newArticle.AVGS = action.payload.AVGS;
            newArticle.Retention = action.payload.Retention;
            newArticle.BEST_PRACTICE = action.payload.BEST_PRACTICE;
            newArticle.ARCHIVING = action.payload.ARCHIVING;
            newArticle.AVOIDANCE = action.payload.AVOIDANCE;
            newArticle.SUMMARIZATION = action.payload.SUMMARIZATION;
            newArticle.DELETION = action.payload.DELETION;
            return {...state,newArticle:newArticle}
        }
        case "GET_TOP5_TABLES":
        {
            const { newArticle } = state;
            const datas = action.payload;
            var archobj = datas[0].ARCHOBJ;
            var tables = datas.map((data)=>{

                return data.TABLENAME;
            });
            console.log(tables);
            newArticle.ARCHOBJ = archobj;
            newArticle.TABLES=tables;
            
            return {...state,newArticle:newArticle}
        } 
        case "SET_BASIC_INFO":
        {
            const { newArticle } = state;
            newArticle.TABLES = action.payload.tables;
            newArticle.SIZE = action.payload.size;
            newArticle.TABLESDSC = action.payload.dsc;

            return {...state,newArticle:newArticle}
        } 
        case "SET_ARTICLE_NAM_DSC":
        {
            const { newArticle } = state;
            
            newArticle.CUSTOMER_ID = action.payload.customer_id;
            newArticle.ARTICLE_NAM = action.payload.article_nam;
            newArticle.ARTICLE_DSC = action.payload.article_dsc;
           
            return {...state,newArticle:newArticle}
        }
        case "SET_SUM":
        {
            const { newArticle } = state;

            newArticle.SUMMARIZATION = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_ARCH":
        {
            const { newArticle } = state;


            newArticle.ARCHIVING = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_RETENTION":{
            const { newArticle } = state;

            newArticle.RETENTION = action.payload;
            return {...state,newArticle:newArticle}
        }       
        case "SET_AVOID":
        {
            const { newArticle } = state;

            newArticle.AVOIDANCE = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_DEL":
        {
            const { newArticle } = state;

            newArticle.DELETION = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_SAVING":
        {
            const { newArticle } = state;
            newArticle.SAVING_EST = action.payload.saving_est;
            newArticle.SAVING_EST_P = action.payload.saving_est_p;
            newArticle.SAVING_ACT = action.payload.saving_act;
            newArticle.SAVING_ACT_P = action.payload.saving_act_p;
            newArticle.COMMENT= action.payload.comment;
            return {...state,newArticle:newArticle}
        }

        case "POST_ARTICLE":
        {
            return {...state,refresh:true}
        } 
        case "UPDATE_ARTICLE":{ 

            return {...state,refresh:true}
        }
           
        
        case "GET_CREATE_RANK":
        {
            const {newArticle} = state 
        var createarticle = newArticle;
        createarticle.bestpractice=action.payload;
        return {...state,newArticle:createarticle};

        }


    }
        
    
        return state;
        
}



