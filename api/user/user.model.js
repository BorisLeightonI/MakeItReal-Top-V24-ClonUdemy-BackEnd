const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    enum: ['user', 'student','teacher', 'admin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  payment: [],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
