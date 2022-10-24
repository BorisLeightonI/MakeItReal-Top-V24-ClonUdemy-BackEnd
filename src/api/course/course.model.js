const { model, Schema, models } = require('mongoose')

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    language: {
      type: String,
      enum: ['English(US)', 'Spanish(CO)'],
      default: 'English(US)'
    },
    level: {
      type: String,
      enum: ['Beginner level', 'Intermediate level', 'Expert level', 'All levels'],
      default: "All levels"
    },
    category: {
      type: String,
      enum: [
        "Development",
        "IT & Software",
        "Design",
        "Marketing",
        "Teaching & Academics",
      ]
    },
    primaryTaught: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    video: {
      type: String,
      required: false
    },
    learningObjectives: [{}],
    requirements: [{}],
    intendedLearners: [{}],
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    price: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'USD'
    },
    courseOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseStudents: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

module.exports = Course;
