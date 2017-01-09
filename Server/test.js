var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Pilot'); 
var Schema = mongoose.Schema;




var Pilot = new Schema({
     	userid:String,
      cert_id:Number,
    username:String,
    name:String,
    password:String,
    role:String,
    level:{
      current_level:String,
      target_level:String
    },
    flightinfo:{
      flightTime:Number,
      flightRoute:Number
    },
    department:String,
    company_id:String,
    company:String,
    create_time:{type:Date,default:Date.now}
});
mongoose.model('Pilot',Pilot);
var Pilot = mongoose.model('Pilot');
var pilot = new Pilot({
    userid:'12',
    cert_id: '21',
    username:'fdsa',
    name:'String',
    password:'String',
    role:'String',
    level:{
      current_level:'String',
      target_level:'fdas'
    },
    flightinfo:{
      flightTime: '12',
      flightRoute: '21'
    },
    department:'String',
    company_id:'String',
    company:'String',
    create_time:"2016-07-07"
});


pilot.save(function (err) {
    console.log('save status:',err ? 'failed' : 'success');
});


Pilot.find({}, function (err,results) {
        if(err){
            console.log('error message',err);
            return;
        }
        console.log('results',results);
    });


