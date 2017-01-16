

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Workflow = new Schema({
    workflow_id: String,
    title:String,
    description:String,
    //用来描述满足什么样的条件才能申请
    conditions:[String],
    target_level:String,
    previous_level:[String],
    owner:String,
    steps:[Schema.Types.Mixed],
    creationdate:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Workflow',Workflow,'Workflows');

/*

{
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
      courses:[{course_id:"table1"}],
          name:"注册学习"
    },
    {
      sequence:3,
      courses:"course3",
      name:"FTD第三课"
    }
    ]
   }


*/