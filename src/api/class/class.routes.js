const router = require('express').Router();
const classController = require('./class.controller');
//const { auth } = require('../../utils/auth')

router.route("/:courseId").post(classController.create)
/* router.route("/").post(classController.createBlankClass) */
router.route("/").get(classController.list)
router.route("/:classId").get(classController.show)
router.route("/:classId").put(classController.update)
router.route("/:classId").delete(classController.destroy)

module.exports = router;
