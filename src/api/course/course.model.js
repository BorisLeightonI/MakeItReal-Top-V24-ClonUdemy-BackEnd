const { model, Schema, models } = require('mongoose')

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    avgRate: {
      type: Number
    },
    students: {
      type: Number,
    },
    price: {
      type: Number,
    },
    currency: {
      type: String
    },
    description: {
      type: String,
    },
    dateUpdated: {
      type: Date,
    },
    totalHours: {
      type: Number,
    },
    Level: {
      type: String,
      default: "All levels",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hasSubtitles: {
      type: Boolean,
      default: false,
    },
    youWill: {
      type: [String],
    },
    language: {
      type: String,
      default: "english",
    },
    category: {
      type: String,
      enum: [
        "Development",
        "IT & Software",
        "Design",
        "Marketing",
        "Teaching & Academics",
      ],
    },
    primaryTaught: [{//
      id: String,
      value: String
    }],
    courseOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    rating: {
      type: Number,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

module.exports = Course;
