const mongoose=require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const CourseSchema=mongoose.Schema({
    speciality:String,
    name:String,
    teacherId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    students:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    desc:String,
    cpdf:String,
})
CourseSchema.plugin(uniqueValidator);

const course = mongoose.model('Course',CourseSchema)

module.exports=course