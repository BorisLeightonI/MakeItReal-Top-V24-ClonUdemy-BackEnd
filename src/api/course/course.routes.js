const router = require("express").Router();
const courseController = require('./course.controller');

router.route("/:userId").post(courseController.create)
router.route("/").post(courseController.createBlankCourse)
router.route("/").get(courseController.list)
router.route("/:courseId").get(courseController.show)
router.route("/:courseId").put(courseController.update)
router.route("/:courseId").delete(courseController.destroy)

module.exports = router;
