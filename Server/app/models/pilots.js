var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Pilot = new Schema({
    userid:String,
    cert_id:String,
    username:String,
    name:String,
    password:String,
    role:String,
    level:{
      current_level:String,
      target_level:String
    },
    flightinfo:{
      flightTime:{type:Number,default:0},
      flightRoute:{type:Number,default:0}
    },
    personnal_type:String,
    basemonth:Number,
    health_check:Date,
    department:String,
    company_id:String,
    company:String,
    schools:[Schema.Types.Mixed],
    trained_flights:[Schema.Types.Mixed], 
    create_time:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Pilot', Pilot,'Pilots');
/*

{
    userid:"1",
    username:"caobin",
    name:"曹斌",
    password:"test",
    role:"ADM",
    level:{
      current_level:"F0",
      target_level:"F1"
    },
    flightinfo:{
      flightTime:900,
      flightRoute:100
    },
    department:"国航第九飞行编队",
    company_id:"SH1001",
    company:"国航上海分公司",
    create_time:"2016-07-07"
   }


*/