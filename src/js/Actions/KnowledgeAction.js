import axios from "axios";
import { Modal } from 'antd';


export function ShowPersonnal()
{
  return dispatch=>{
    dispatch({type:"OPEN_PERSONNAL_PANEL"})
   }
}

export function ShowPersonalInfo()
{
  return dispatch =>{

  var results;
  axios.get("http://localhost:8083/api/nerds")
  .then(function (response) {
    console.log("response is !!!!!!!!",response);
    results = response;
     if(results.status == 200)
  {
    dispatch({type:"GET_PERSONNAL_INFO",payload:results.data})
    
  }
  else
  {
    console.log("Did not retrieve data");
  }
  })
  .catch(function (error) {
    console.log(error);
  });
}
}


export function ShowMainPanel()
{
  return dispatch=>{
    dispatch({type:"SHOW_ARTICLE_MAIN"}) 
  }
}
export function fetchArticles(user){

var customerid;
if(user.ROLE=="ADM")
{
    customerid = '32326';

}
else{
  customerid = user.CUSTOMER_ID;
}

//http://10.128.245.87:8004/HANAXS_TEST/services/knowledge_management.xsodata/KMDB?$format=json&$orderby=ARTICLE_ID desc&$top=5&$filter=CUSTOMER_ID eq '32326'
    return dispatch=>{
    axios.get("http://10.97.144.117:8000/SmartOperations/services/articleContent.xsjs?customerId="+customerid,{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        },
    auth: {
    username: 'zengheng',
    password: 'Sap12345'
     }
    })
    .then(function (response,err) {
        var data = response.data;
        dispatch ({type:"FETCH_ARTICLE_FULFILLED",payload:data})    
  })
  
    }
    
    
}

export function ShowEditPanel(data){
    return dispatch=>{
      dispatch({type:"SHOW_EDIT_PANEL",payload:data})
    }
}
export function CloseEditPanel(data){
    return dispatch=>{
      dispatch({type:"CLOSE_EDIT_PANEL",payload:data})
    }
}

export function CloseMainPanel()
{

   return dispatch=>{
    dispatch({type:"CLOSE_ARTICLE_MAIN"})
   }
}

export function AddCard(data)
{

   return dispatch=>{

    dispatch({type:"ADD_ARTICLE_VIEW",payload:data})

   }

}


export function RemoveCard(data)
{

   return dispatch=>{

    dispatch({type:"REMOVE_ARTICLE_VIEW",payload:data})

   }

}

export function ShowCreatePanel()
{

   return dispatch=>{

    dispatch({type:"SHOW_CREATE_PANEL"});
   }


}

export function CloseCreatePanel()
{
  return dispatch=>{

    dispatch({type:"CLOSE_CREATE_PANEL"});
   }
}

export function NewArticleStepOne(data)
{
  return dispatch=>{

    dispatch({type:"NEW_ARTICLE_STEP_ONE",payload:data})

  }



}

export function ForwardStep(){

  return dispatch=>{
      dispatch({type:"ADD_ONE_STEP"})

  }
}

export function BackwardStep(){

 return dispatch=>dispatch({type:"BACT_ONE_STEP"})

}

export function GetBestPractice(data){

  var customerid = data.customerid;  
  var archobj = data.archobj;
  var articleid = data.articleid;
return dispatch=>{        
              axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsjs?cmd=RECOMMENDATAION&archobj=" + archobj + "&industry=AUTO" ,{
              headers:{

                  'X-My-Custom-Header': 'Header-Value',
                  'Content-Type': 'application/json'
                },
               
                auth: {
                  username:'zengheng',
                  password: 'Sap12345'
                }
            }).then(function(response,err){
              
              var data = response.data.results[0];
              data.articleid = articleid;
              dispatch({type:"GET_BEST_PRACTICE",payload:data});


            }).catch(function(err){
              console.log(err);
            })

      axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE?$filter= ARCHOBJ eq '"+archobj+"'",{
                          headers:{
                  'X-My-Custom-Header': 'Header-Value',
                  'Content-Type': 'application/json'
                },
               
                auth: {
                  username:'zengheng',
                  password: 'Sap12345'
                }   
              }).then(function(response,err){
                console.log(response.data.d.results[0])
                var payload = {
                    articleid:articleid,
                    result:response.data.d.results[0]
                }

              dispatch({type:"GET_BEST_PRACTICE_STEP2",payload:payload});
              }).catch(function(err){console.log(err)})


  
    }
}
export function GetSAPBestPractice(data)
{

      var archobj = data.archobj;
      console.log(archobj)

      return dispatch=>{ 
        axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE?$filter= ARCHOBJ eq '"+archobj+"'",{
                      headers:{
                  'X-My-Custom-Header': 'Header-Value',
                  'Content-Type': 'application/json'
                },
               
                auth: {
                  username:'zengheng',
                  password: 'Sap12345'
                }   
              }).then(function(response,err){
                console.log(response.data.d.results[0])
                var payload = {
                    result:response.data.d.results[0]
                }

              dispatch({type:"GET_CREATE_RANK",payload:payload});
              }).catch(function(err){console.log(err)})

    }       


}
//get best practice & industry practice
export function GetPractices(obj){
  var config = {
      headers:{
          'X-My-Custom-Header': 'Header-Value',
          'Content-Type': 'application/json'
      },
      auth: {
          username:'zengheng',
          password: 'Sap12345'
      }
  };
return dispatch=>{        
    axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsjs?cmd=RECOMMENDATAION&archobj=" + obj + "&industry=AUTO",
      config).then(function(response,err){
              
          var data = response.data.results[0];              
          var archobj = data.ARCHOBJ;
          axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE?$filter= ARCHOBJ eq '"+archobj+"'",
              config).then(function(response,err){
                  var detail = response.data.d.results[0];
                  var payload = {
                    AVGS:data.AVGS,
                    Retention:data.Retention,
                    BEST_PRACTICE:detail.BEST_PRACTICE,
                    ARCHIVING:detail.ARCHIVING,
                    AVOIDANCE:detail.AVOIDANCE,
                    SUMMARIZATION:detail.SUMMARIZATION,
                    DELETION:detail.DELETION
                  }

                  dispatch({type:"GET_PRACTICES",payload:payload});
            }).catch(function(err){console.log(err)})



      }).catch(function(err){
         console.log(err);
      })

      

  
    }
}
export function GetTop5Tables(attr_nam){

 
  return dispatch=>{

    axios.get("http://10.97.144.117:8000/SmartOperations/services/Createarticle_test.xsjs?attr_nam="+attr_nam,{
      headers:{
        'X-My-Custom-Header':'Header-Value',
        'content-type':'application/json'
      },
      auth:{
        username:'zengheng',
        password:'Sap12345'
      }
      
    }).then(function(response,err){
      var data = response.data.results;

      dispatch({type:"GET_TOP5_TABLES",payload:data});
     
    }).catch(function(err){
      console.log(err);
    })

  }

    


}
export function SetBasicInfo(data){
  console.log(data);
  return dispatch=>{

    dispatch({type:"SET_BASIC_INFO",payload:data});

  }
}
export function SetArticleNamAndDsc(data){
  return dispatch=>{
    dispatch({type:"SET_ARTICLE_NAM_DSC",payload:data});
  }
}
export function SetSummarization(data){
  return dispatch=>{
    dispatch({type:"SET_SUM",payload:data})
  }
}

export function SetRetention(data){
  return dispatch=>{
    dispatch({type:"SET_RETENTION",payload:data})
  }
}

export function SetArchiving(data){
  return dispatch=>{
    dispatch({type:"SET_ARCH",payload:data})
  }
}
export function SetAvoidance(data){
  return dispatch=>{
    dispatch({type:"SET_AVOID",payload:data})
  }
}
export function SetDeletion(data){
  return dispatch=>{
    dispatch({type:"SET_DEL",payload:data})
  }
}
export function SetSaving(data){
  return dispatch=>{
    dispatch({type:"SET_SAVING",payload:data})
  }
}
export function PostArticle(data1){
 
 // console.log(data1)
  var data =data1.newArticle;
  var user=data1.user.USERNAME;


  var article_id;
  //fields in table "KMBSC"
  var tables = data.TABLES;
  var size = data.SIZE;
  var tablesDsc = data.TABLESDSC;

  //fields in table "KMHDR"
  var customer_id = data.CUSTOMER_ID.toString();
  var archobj = data.ARCHOBJ;
  var article_nam = data.ARTICLE_NAM;
  var article_dsc = data.ARTICLE_DSC;
  var create_by = user;
  var product = "ERP";
  var createdate = (new Date()).getTime();

  //fields in table "KMDVM"
  var archiving = data.ARCHIVING;
  var deletion = data.DELETION;
  var summarization = data.SUMMARIZATION;
  var avoidance = data.AVOIDANCE;
  var retention = data.RETENTION;
  var saving_est = data.SAVING_EST;
  var saving_est_p = data.SAVING_EST_P;
  var saving_act = data.SAVING_ACT;
  var saving_act_p = data.SAVING_ACT_P;
  var comment = data.COMMENT;

  //if user does not choose the related method,set default value;
  if(archiving == undefined){
    archiving = "";
  }
  if(deletion == undefined){
    deletion = "";
  }
  if(summarization == undefined){
    summarization = "";
  }
  if(avoidance == undefined){
    avoidance = "";
  }
  if(retention == undefined){
    retention = 12;
  }
  if(saving_est == ""){
    saving_est = null;
  }
  if(saving_est_p == ""){
    saving_est_p = null;
  }
  if(saving_act == ""){
    saving_act = null;
  }
  if(saving_act_p == ""){
    saving_act_p = null;
  }
  for(var i = 0; i < size.length;i++){
    if(size[i] == ""){
      size[i] = null;
    }
  }
  var config = {
    headers:{
        'X-My-Custom-Header':'Header-Value',
        'content-type':'application/json'
        },
        auth:{
          username:'zengheng',
          password:'Sap12345'
        }
  };
  return dispatch=>{
    
    //fetch article id for creation
    axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMBSC?$orderby=ARTILE_ID desc&$top=1",
      config
      ).then(function(response){
        article_id = Number(response.data.d.results[0].ARTILE_ID) + 1;
        article_id = article_id.toString();
        //creation for KMBSC
        for(var i = 0; i < tables.length && i < size.length && i < tablesDsc.length;i++){
          var attr_id = i+1;
          var tableSize;
          if(size[i] != null){
            tableSize = size[i].toString();
          }
          else{
            tableSize = null;
          }
          
          axios.post("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMBSC",{
            ARTILE_ID:article_id,
            ATTR_ID:attr_id,
            ATTR_TYP:"TBL",
            ATTR_NAM:tables[i],
            ATTR_DSC:tablesDsc[i],
            TBL_SIZE:tableSize
            },
            config
          ).catch(function(response){
            console.log(response);
          });
        }
        //fetch factor_guid
        axios.get("http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$filter=FACTOR_NAME eq '"+archobj+"'",
          config
          ).then(function(response){
              var factor_guid = response.data.d.results[0].FACTOR_GUID;
              //creation for KMHDR
              axios.post("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMHDR",{
      
                ARTICLE_ID:article_id,
                FACTOR_GUID:factor_guid,
                CUSTOMER_ID:customer_id,
                FACTOR_CAT:"B",
                FACTOR_TYP:"DVM",        
                ARTICLE_NAM:article_nam,
                ARTICLE_DSC:article_dsc,
                CREATE_ON:"\/Date("+createdate+")\/",
                CREATE_BY:create_by,
                UPDATE_ON:null,
                UPDATE_BY:null
              },config);


          }).catch(function(response){
          })
        
        //creation for KMDVM
        var total_size = 0;
        size.map((one)=>{
            if(one != null){
              total_size = Number(total_size + one);
            }
            
        });
        total_size = total_size.toString();
        axios.post("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMDVM",{
      
          ARTICLE_ID:article_id,    
          TOTAL_SIZE:total_size,
          ARCHIVING:archiving,    
          DELETION:deletion,
          SUMMARIZATION:summarization,
          AVOIDANCE:avoidance,
          RETENTION:retention,
          SAVING_EST:saving_est,
          SAVING_EST_P:saving_est_p,
          SAVING_ACT:saving_act,
          SAVING_ACT_P:saving_act_p, 
          COMMENT:comment,  
          ARCHOBJ:archobj

        },
        config).then(function(response){
            dispatch({type:"POST_ARTICLE",payload:{refresh:true}})
            const modal = Modal.success({
              title: 'Successfully create! ',
              content: 'The article is created done',
            });

        }).catch(function(response){
          console.log(response);
        })


      }).catch(function(response){
        console.log(response);
      })
  
  }

  
  
}
export function UpdateArticle(data){
  var config = {
    headers:{
        'X-My-Custom-Header':'Header-Value',
        'content-type':'application/json'
        },
        auth:{
          username:'zengheng',
          password:'Sap12345'
        }
  };
  return dispatch=>{
    data.tables.map((table,idx)=>{
      idx = idx+1;
      axios.put("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMBSC(ARTILE_ID="+data.article_id+",ATTR_ID="+idx+")",{
        ARTILE_ID:data.article_id,
        ATTR_ID:idx,
        ATTR_TYP:"TBL",
        ATTR_NAM:table.ATTR_NAM,
        ATTR_DSC:table.ATTR_DSC,
        TBL_SIZE:table.TBL_SIZE
    },config);
    });
    var updatedate = (new Date()).getTime();
    
    axios.put("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMHDR("+data.article_id+")", {
        
        ARTICLE_ID:data.article_id,
        FACTOR_GUID:data.factor_guid,
        CUSTOMER_ID:data.customer_id,
        FACTOR_CAT:"B",
        FACTOR_TYP:"DVM",        
        ARTICLE_NAM:data.article_nam,
        ARTICLE_DSC:data.article_dsc,
        CREATE_ON:"\/Date("+updatedate+")\/",
        CREATE_BY:data.create_by,
        UPDATE_ON:"\/Date("+updatedate+")\/",
        UPDATE_BY:"CASSIE"
        

    },config
    ).then(function (response) {
        axios.put("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMDVM("+data.article_id+")",{
          ARTICLE_ID:data.article_id,    
          TOTAL_SIZE:"1",
          ARCHIVING:data.archiving,    
          DELETION:data.deletion,
          SUMMARIZATION:data.summarization,
          AVOIDANCE:data.avoidance,
          RETENTION:data.retention,
          SAVING_EST:data.saving_est,
          SAVING_EST_P:data.saving_est_p,
          SAVING_ACT:data.saving_act,
          SAVING_ACT_P:data.saving_act_p, 
          COMMENT:data.comment,  
          ARCHOBJ:data.archobj
        },
        config)
        .then(function(response){

          dispatch({type:"UPDATE_ARTICLE"});
            const modal = Modal.success({
            title: 'Successfully update! ',
            content: 'The article is updated done',
            });
            
        })
        .catch(function(response){
          console.log(response);
        })
    })
    .catch(function (response) {
        console.log(response);
    });
    
  }
}
export function DeleteArticle(data){
  var article_id = data.ARTICLE_ID;
  var tables = data.TABLES;
  var config = {
    headers:{
            'X-My-Custom-Header':'Header-Value',
            'content-type':'application/json'
          },
          auth:{
            username:'zengheng',
            password:'Sap12345'
          }
    };
  return dispatch=>{

    //KMBSC
    tables.map((table,idx)=>{
      idx = idx+1;
       axios.delete("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMBSC(ARTILE_ID="+article_id+",ATTR_ID="+idx+")",
        config).then(function(response){

      })
      .catch(function(response){
        console.log(response);
      })
    });

    //KMDVM
    axios.delete("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMDVM("+article_id+")",config)
      .then(function(response){
        axios.delete("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMHDR("+article_id+")",config)
      .then(function(response){
          const modal = Modal.success({
            title: 'Successfully delete! ',
            content: 'The article is deleted done',
            });
          })
      .catch(function(response){
        console.log(response);
      })
        
      })
      .catch(function(response){
        console.log(response);
      })
  
  }
}


