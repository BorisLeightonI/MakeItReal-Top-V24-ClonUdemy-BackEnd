const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
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
  isTeacher: {
    type: Boolean,
    default: false
  },
  isInstructor: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: String,
    ref: 'payment'
  },
  teacherCourses:[
    {
      type: String,
      ref: 'course'
    }
  ],
  studentCourses: [
    {
      type: String,
      ref : 'course'
    }
  ],//todo lo anterior es comun a ambos teacher y student // si es estudiante datos de teacher null
  teacherDescription:{
    type: String,
  },
  position:{
    type: String
  },
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;
