var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Message = new Schema({
    message_id: String,
    title:String,
    workflowid:String,
    description:String,
    type:String,
    applier:String,
    owner:String,
    creationdate:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Message',Message,'Message');


/* courses


,
wo




endof courses
*/