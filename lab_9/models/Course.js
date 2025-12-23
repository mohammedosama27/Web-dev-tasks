var mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true },
  numberOfStudents: { type: Number, default: 0 },
  category: { type: String, required: true },
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;