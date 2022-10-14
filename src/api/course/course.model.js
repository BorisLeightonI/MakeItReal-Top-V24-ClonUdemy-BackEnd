const mongoose = require('mongoose');

function getPrice(num){ return (num/100).toFixed(2);}

function setPrice(num){ return num*100;}

const courseSchema = new mongoose.Schema({
  active:{
    type: Boolean,
    default: true,
  },
  title : {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    // required: true,
  },
  language: {
    type: String,
    default: 'english'
  },
  level: {
    type: String,
    enum: ['Begginer Level', 'Intermediate Level', 'Expert Level', 'All Level'],
    default: 'Begginer Level'
  },
  category : {
    type: String,
    enum : ['Development', 'IT & Software','Design', 'Marketing','Teaching * Academics']
  },
  price: {
    type: Number,
    get: getPrice,
    set: setPrice
  },
  primaryTaught:{
    type: String,
  },
  courseOwner :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
  ],
  rating: {
    type: Number
  },
  isPurchased: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
