var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Message = new Schema({
    message_id: String,
    title:String,
    workflowid:String,
    description:String,
    type:String,
    applier:String,
    message_key:String,
    documentId:String,
    owner:String,
    status:String,
    action:String,
    applierId:String,
    creationdate:{type:Date,default:Date.now},
    approverName:String,
    approverId:String,
    approveTime:Date
})

module.exports=mongoose.model('Message',Message,'Message');


/* courses


,
wo




endof courses
*/