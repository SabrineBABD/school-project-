
const mongoose=require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const ResultSchema=mongoose.Schema({
   courseId: {type:mongoose.Schema.Types.ObjectId, ref:"Course"},
   studentId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
   note:Number,
   evaluation:String, 
})
ResultSchema.plugin(uniqueValidator);

const Result = mongoose.model('Result',ResultSchema)

module.exports=Result