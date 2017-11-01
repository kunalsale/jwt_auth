var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
{
	name:{
		type:String,
		required:true},
	password:{
		type:String,
		required:true},
	number:{
		type:String,
		required:true}
});

module.exports = mongoose.model('User',UserSchema);

