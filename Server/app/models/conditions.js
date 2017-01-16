var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Conditions = new Schema({
    condition_id:String,
    condition_name:String,
    condition_type:String,
    restrict:Boolean,
})

module.exports=mongoose.model('Conditions',Conditions,'Conditions');


/* courses

{
    company_id:"SH1001",
    company_name:"国航上海分公司",
    departments:[{name:"飞行部"},{name:"信管部"}],
    address:"xxxxx",
    },



endof courses
*/