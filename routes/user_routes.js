const userRoutes = require('express').Router();

const UserController = require('../Controller/user_controller');

userRoutes.post('/register', UserController.register);

module.exports = userRoutes;