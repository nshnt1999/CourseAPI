const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  author:String,
  profile:String,
  image:String,
  desc:String,
  duration:String,
  name: String,
  type:String,
  back:String,
  videos:[]
});

module.exports = mongoose.model('course', CourseSchema);