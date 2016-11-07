var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Pilot = new Schema({
     id : String,
     name : String,
     password : String,
     role:String,
     level:{
              current_level: String,
              target_level: String
              }
})

module.exports = mongoose.model('Pilot', Pilot,'Pilots');
