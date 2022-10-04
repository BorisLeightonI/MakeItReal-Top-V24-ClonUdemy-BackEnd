const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  active:{
    type: Boolean,
    default: true,
  },
  owner :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  classOfCourse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  rating: {
    type: Number
  },
  isPurchased: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
