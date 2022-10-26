const { model, Schema, models } = require("mongoose");

const UserSchema = new Schema(
  {
    isInstructor: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        async validator(email) {
          try {
            const user = await models.user.findOne({ email });
            return !user;
          } catch (err) {
            return false;
          }
        },
        message: "There is an user with this email that already exists",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    avatar: {
      type: String,
      default: "",
    },
    payment: {
      type: String,
      ref: "payment",
    },
    teacherCourses: {
      type: [{ type: Schema.Types.ObjectId, ref: "course" }],
    },
    studentCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    teacherDescription: {
      type: String,
    },
    position: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("user", UserSchema);

module.exports = User;
