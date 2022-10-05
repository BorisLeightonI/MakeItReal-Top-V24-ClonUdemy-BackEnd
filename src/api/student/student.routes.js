const router = require('express').Router();
const studentController = require('./student.controller');
const { auth } = require('../../utils/auth')

router.route('/', auth).post(studentController.signup);

// router.route('/').post(studentController);
// router.route("/").get(studentController.list)
// router.route("/:studentId").get(studentController.show)
// router.route("/:studentId").put(studentController.update)
// router.route("/:studentId").delete(studentController.destroy)

module.exports = router;
