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
   Courses:[{
    course_id:"course1",
    title:"固态模拟机乱飞",
    description:"必须飞的",
    category:"课程",
    details:[{
      id:1,
      title:"测试飞行"},{
        id:2,
        title:"使用操作杆"}]
   },
   {
    course_id:"course2",
    title:"熟练检查工作单",
    description:"必须飞的324432",
    category:"课程",
    details:[
    {id:1,
      title:"学会模拟"},
      {id:2,
        title:"误操作"}

    ]
   },
   {
    course_id:"course3",
    title:"航线运输驾驶员执照",
    description:"加油加油！",
    category:"课程",
    details:[
    {id:1,
      title:"航线"},
      {id:2,
        title:"牛逼"}

    ]
   },
   {
    course_id:"course4",
    title:"机长转机型训练",
    description:"来来来，训练！",
    category:"课程",
    details:[
    {id:1,
      title:"开门"},
      {id:2,
        title:"上飞机"}

    ]
   },
   {
    course_id:"course5",
    title:"熟练检查工作单",
    description:"必须飞的324432",
    category:"课程",
    details:[
    {id:1,
      title:"学会模拟"},
      {id:2,
        title:"误操作"}

    ]
   }
   ],
    Companys:[{
    company_id:"SH1001",
    company_name:"国航上海分公司",
    departments:[{name:"飞行部"},{name:"信管部"}],
    address:"xxxxx",
    },
    {
     company_id:"BJ1001",
     company_name:"国航北京分公司",
     departments:[{name:"飞行部"},{name:"信管部"},{name:"外交部"}],
     address:"XXXXXXXXX"
    }
    ]
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