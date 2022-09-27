const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
   },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'student'
  },
  isactive: {
    type: Boolean,
    default: false,
  },
  studentcourses : {
    type: String,
    ref: 'course'
  },
  payment: [],
}, { timestamps: true })

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
