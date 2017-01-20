var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Level = new Schema({
      name:String,
      inuse:{type:Boolean,default:false}, 
      owner:String,
      create_time:{type:Date,default:Date.now},
      modify_time:Date,
      modifyer:String,
      entries:[
      {
        level:String,
        flight_factor:Number,
        description:String
      }]
    
})

module.exports=mongoose.model('Level',Level,'Levels');
