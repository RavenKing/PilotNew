var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Course = new Schema({
    course_id: String,
    title:String,
    description:String,
    category:String,
    details:[String],
    owner:String,
    url:String,
    creationdate:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Course',Course,'Courses');


/* courses


,
wo




endof courses
*/