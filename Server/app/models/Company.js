var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var Company = new Schema({
    company_id: String,
    company_name:String,
    description:String,
    address:String,
    departments:[Schema.Types.Mixed],
    owner:String,
    creationdate:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Company',Company,'Companys');


/* courses

{
    company_id:"SH1001",
    company_name:"国航上海分公司",
    departments:[{name:"飞行部"},{name:"信管部"}],
    address:"xxxxx",
    },



endof courses
*/