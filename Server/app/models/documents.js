var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Document = new Schema({
    userId: String,
    startdate:Date,
    enddate:Date,
    level:{
                 previous_level: String,
                 target_leverl:String  
            },
    course:[{
                         courseId: String,
                         status: String,
                         details:[],
                         sign:Boolean,
                         coach:String,
                         coachId: String
               }],
 currentCourseID:String,
  workflowId: String
})

module.exports=mongoose.model('Document',Document,'Documents');