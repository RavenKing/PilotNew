// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', {
    name : {type : String, default: ''}
},'Nerd');

module.exports = mongoose.model('Test',{
	name:{type : String, default: ''}
});

module.exports = mongoose.model('personalInfo',{
	userId:{type:String , default:'' },
	name:{type:String , default:''},
	pass:{type:String , default:''},
	role:{role:String , default:''},
	level:{
		current_level:{type:String , default:''},
		target_level:{type:String , default:''}
	}
});