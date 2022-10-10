const router = require('express').Router();
const userController = require('./user.controller');
const { auth } = require('../../utils/auth');

router.route('/', auth).post(userController.signup);

module.exports = router;
