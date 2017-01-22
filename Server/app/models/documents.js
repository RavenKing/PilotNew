var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Document = new Schema({
    cert_id: String,
    workflow_id:String,
    title:String,
    status:String,
    start_date:Date,
    end_date:Date,
    previous_level: String,
    target_level:String,  
    steps:[Schema.Types.Mixed] 
})

module.exports=mongoose.model('Document',Document,'Documents');


/* documents


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



endof documents
*/