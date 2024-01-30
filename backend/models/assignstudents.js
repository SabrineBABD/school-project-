const mongoose=require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const AssignstudentSchema=mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"Course"},
    teacherId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},  
})
AssignstudentSchema.plugin(uniqueValidator);

const AssignStudent = mongoose.model('Assignstudent',AssignstudentSchema)

module.exports=AssignStudent