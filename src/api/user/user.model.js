const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  isInstructor: {
    type: Boolean,
    default: false
  },
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
  ],
  teacherDescription:{
    type: String,
  },
  position:{
    type: String
  },
}, { timestamps: true });

const User = mongoose.model('user', UserSchema);

module.exports = User;
