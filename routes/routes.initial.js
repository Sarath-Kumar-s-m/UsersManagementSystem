const express = require('express');
const initialControllers = require('../controllers/controller.initial.js')
const adminAuthentication = require('../middlewares/authentications/auth.admin.js')
const userAuthentication = require('../middlewares/authentications/auth.user.js');
const initialRoutes = express.Router();



initialRoutes.get('/login', adminAuthentication.adminAuthentication, userAuthentication.userAuthentication, initialControllers.login);
initialRoutes.post('/login', initialControllers.login);
initialRoutes.get('/signup', initialControllers.signup)
initialRoutes.post('/signup', initialControllers.signup)

module.exports = initialRoutes;