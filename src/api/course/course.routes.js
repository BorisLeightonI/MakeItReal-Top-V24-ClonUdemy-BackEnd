const router = require("express").Router();
const courseController = require('./course.controller');
const { auth } = require('../../utils/auth');

router.route("/").post(auth, courseController.create)
// router.route("/").post(courseController.createBlankCourse)
router.route("/").get(auth, courseController.list)
router.route("/:courseId").get(auth, courseController.show)
router.route("/:courseId").put(auth, courseController.update)
router.route("/:courseId").delete(auth, courseController.destroy)

module.exports = router;
