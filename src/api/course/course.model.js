const mongoose = require('mongoose');

function getPrice(num){ return (num/100).toFixed(2);}

function setPrice(num){ return num*100;}

const courseSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category : {
    type: String,
    enum : ['python', 'web development']
  },
  price: {
    type: Number,
    get: getPrice,
    set: setPrice
  },
  active:{
    type: Boolean,
    default: true,
  },
  owner :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
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
