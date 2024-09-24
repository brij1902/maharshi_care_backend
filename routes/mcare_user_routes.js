const MCareRoutes = require('express').Router();

const MCareController = require('../Controller/mcare_user_controller');

MCareRoutes.post('/register', MCareController.registerUser);
MCareRoutes.post('/login', MCareController.loginUser);

module.exports = MCareRoutes;