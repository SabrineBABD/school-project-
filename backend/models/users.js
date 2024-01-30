const mongoose=require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema=mongoose.Schema({
    image:String,
    cv:String,
    firstName:String,
    lastName:String,
    email: { type: String,  unique: true, required: true },
    password:String,
    address:String,
    tel:String,
    speciality:String,
    childTel:String,
    role:String,
    status:Boolean,
})
UserSchema.plugin(uniqueValidator);

const user = mongoose.model('User',UserSchema)

module.exports=user