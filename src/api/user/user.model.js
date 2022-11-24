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
      match: [/^[A-Z]+$/i, "Full name not validate"],
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Email not validate"],
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
      minlength: 8,
      maxlength:16,
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
      type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    },
    studentCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
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
