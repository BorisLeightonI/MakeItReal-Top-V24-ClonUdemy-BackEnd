const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
    default: 'teacher',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  courses: [
    {
    type: String,
    ref: 'course'
    }
  ],
  payment: [],
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher;
