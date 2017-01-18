export default function Pilot (
  state = {
   Pilot:null,
   Document:{
    userid:"1",
    start_date:"2016-10-10",
    previous_level:"F0",
    target_level:"F1",
    status:"inprocess",
    workflow_id:"workflow1",
    steps:[{
    name:"固态模拟机学习",
    status:"inprocess",
    sequence:1,
    courses:[
    {
    status:"inprocess", 
    sequence:1,
    course_id:"course1",
    title:"固态模拟机乱飞",
    description:"必须飞的",
    category:"课程",
    details:[{
      id:1,
      title:"测试飞行",
      result:true},
      {
        id:2,
        title:"使用操作杆",
        result:true}
        ],
    overallcomment:"passed"
    },
    {
    status:"non",
    sequence:2,
    course_id:"course2",
    title:"固态模拟机乱11飞22",
    description:"必须飞的324432",
    category:"课程",
    details:[
    {id:1,
      title:"学会模拟"},
      {id:2,
        title:"误操作"}
    ],
    overallcomment:"shitted"
   }]//end of course
    
   },//end of step 1 
   {
    name:"注册学习",
    status:null,
    sequence:2,
      courses:[
      {
        course_id:"table1",
        name:"表格1",
        status:null
      }
      ],
   }, //end of step2 
   {
      name:"FTD第三课",
      status:null,
      sequence:3,
      courses:[
      {
         course_id:"course3",
         name:"第四课",
         status:null
      }

      ],

   }



   ], //end of steps
   },
   role:"ADM",
   status:"INIT",
   activeworkflow:"",
   display:[],
   Workflows:[{
    workflow_id:"workflow1",
    title:"转生流程1",
    description:"F0->F1 转升流程",
    previous_level:"F0",
    target_level:"F1",
    steps:[
    {
      sequence:1,

      courses:[{course_id:"course1",sequence:1},{course_id:"course2",sequence:2}],
      name:"固态模拟机学习"
    },
    {
      sequence:2,
      courses:[{course_id:"course1",sequence:1}],
      name:"FFS"
    },
    {
      sequence:3,
      courses:[{course_id:"course2",sequence:1}],

      name:"FTD第三课"
    }
    ]
   }],
   Courses:[],
    Companys:[]
  }, action
) {
  switch (action.type) {

    case "Add_Card_To_Display":{

    const displayarray = state.display;
    const {payload} = action ; 
    payload.status = state.status;
    payload.cardid = (new Date().getTime()+ Math.floor(Math.random() * 999999)).toString(31);
    displayarray.push(payload)
    return {...state,display:displayarray}
     }
    case "FETCH_PILOT_INFO":{
      return {...state,Pilot:action.payload}
    }
    case "CHANGE_TO_MODIFY":{
      return {...state,status:"MODIFY",activeworkflow:action.payload}
    }

    case "DELETE_COMPANY":{
    const targetdata = action.payload;
    const newCompanys = state.Companys.filter((company)=>{if(company.company_id != targetdata.company_id) return company;  })
      return {...state,Companys:newCompanys}
    }

    case "Remove_Card":
    {
      var payload = action.payload;

       var displayarray=state.display;
    var newdata =   displayarray.filter((displayone)=>{return displayone.cardid != payload.cardid})

      return {...state,display:newdata}
    }
          
  //create company
  case "GET_COMPANY_ALL":{

    return {...state,Companys:action.payload}
  }
  case "CREATE_COMPANY":
  {
    const {Companys} = state;
    Companys.push(action.payload)
    return {...state};

  }
  case "EDIT_COMPANY":
  {
    const targetdata = action.payload;
    const newCompanys = state.Companys.filter((company)=>{
      if(company.company_id == targetdata.company_id)
      {
        company.company_name=targetdata.company_name;
        company.address=targetdata.address;
        company.departments = targetdata.departments;
      }
      return company;
    })
      return {...state,Companys:newCompanys}
  }
//couses reducer
case "FETCH_COURSES_ALL":{
        

    return {...state,Courses:action.payload}



            }

    case "CREATE_COURSE":{
                const coursedata=state.Courses;

                    coursedata.push(action.payload);

              return {...state,Courses:coursedata}
            }

            case "EDIT_COURSE":{

                let values = action.payload;

                let newcourse=state.Courses.filter((course)=>{

                if(course.course_id == values.course_id)
                {
              
                    course.course_id   = values.course_id;
                    course.title = values.title;
                    course.description = values.description;
                    course.category = values.category;
                }
                return course
          })
        return {...state,Courses:newcourse};

            }

    case "DELETE_COURSE":{
          
    const {target} = action.payload;
    console.log(target);
    let newCourses = state.Courses.filter((course)=>{if(course.course_id != target.course_id) return course;  })
      return {...state,Courses:newCourses}


        }


    //end of courses
    case "ADD_COURSE_TO_STEP":
    {
      var courseTitle = action.payload;
      var workflowid = action.payload1;
      var stepSequence = action.payload2;
      var courseid = action.payload3;
      var newworkflows = state.Workflows;
      newworkflows.filter((workflow,i)=>{
        if(workflow.workflow_id == workflowid)
        {
          var steps = workflow.steps;
          steps.filter((step,j)=>{
            if(step.sequence == stepSequence)
            {
              var courses = step.courses;
              var start;
              if(courses.length == 0)
                start = 0;
              else
                start = courses.length-1;
              courses.splice(start,0,{course_id:courseid,sequence:j+1})
            }
          });
        }
      })
      return{...state,Workflows:newworkflows};
    }

    case "CHANGE_STEP_SEQUENCE":
    {
      var steps = action.payload;
      steps.map((step,i)=> {
        step.sequence = i+1;
      });
      var workflowid = action.payload1;
      var newworkflows = state.Workflows;
      newworkflows.filter((workflow,i)=>{
        if(workflow.workflow_id == workflowid)
          workflow.steps = steps;
      })
      return{...state,Workflows:newworkflows};
    }

    case "DELETE_COURSE_FROM_STEP":
    {

      var workflowid = action.payload;
      var stepSequence = action.payload1;
      var courseid = action.payload2;
      var newworkflows = state.Workflows;
      newworkflows.filter((workflow,i)=>{
        if(workflow.workflow_id == workflowid)
        {
          var steps = workflow.steps;
          steps.filter((step,j)=>{
            if(step.sequence == stepSequence)
            {
              var courses = step.courses;
              courses.map((course,k)=>{
                if(course.course_id == courseid)
                {
                  courses.splice(k,1);
                }
              })
            }
          });
        }
      })
      return{...state,Workflows:newworkflows};
    }

    case "SAVE_STEPS_SEQUENCE":
    {
        return {...state,status:"INIT"}
    }

    case "ADD_NEW_WORK_FLOW":
    {
      var newworkflow = action.payload;
      var workflows = state.Workflows;
      workflows.push(newworkflow);
      // return{...state,Workflows:newworkflows};

    }
    case "DELETE_STEP_FROM_WORKFLOW":
    {
      var workflowid = action.payload;
      var stepSequence = action.payload1;
      var newworkflows = state.Workflows;
      newworkflows.filter((workflow,i)=>{
        if(workflow.workflow_id == workflowid)
        {
          var steps = workflow.steps;
          steps.filter((step,j)=>{
            if(step.sequence == stepSequence)
            {
              steps.splice(j,1);
            }
          });
        }
      });
      return{...state,Workflows:newworkflows};
    }
    case "ADD_NEW_STEP":
      {
        var stepName = action.payload;
        var workflowid = action.payload1;
        var newworkflows = state.Workflows;
        newworkflows.map((workflow,i)=>{
        if(workflow.workflow_id == workflowid)
        {
          var length = workflow.steps.length+1;
          workflow.steps.push({sequence:length,courses:[],name:stepName});
        }
        });
        return{...state,Workflows:newworkflows}; 
       
      }
    default:{
      return {...state,status:"INIT"}
    }
  }
}