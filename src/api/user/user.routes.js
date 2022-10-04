const router = require("express").Router();
const userController = require("./user.controller");

router.route("/").post(userController.create)
router.route("/").get(userController.list)
router.route("/:userId").get(userController.show)
router.route("/:userId").put(userController.update)
router.route("/:userId").delete(userController.destroy)

module.exports = router;
