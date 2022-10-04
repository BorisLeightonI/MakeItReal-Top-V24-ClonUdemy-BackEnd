const {mongoose, model, Schema, models }= require('mongoose');

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
    validate : {
      async validator(email) {
        try {
          const student = await models.student.findOne({email});
          return !student
        } catch (error) {
          return false
        }
      },
      message: "Email allready exist"
    }
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
  studentcourses : [{
    type: String,
    ref: 'course'
  }],
  payment: [],
}, { timestamps: true })

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
