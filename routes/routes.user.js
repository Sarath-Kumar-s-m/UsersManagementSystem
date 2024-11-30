/**
 * ThirdParty Dependencies
 */
const express = require('express');

/**
 * Custome Dependencies
 */
const userControllers = require('../controllers/controller.user.js');
const userAuthentication = require('../middlewares/authentications/auth.user.js');

const userRoutes = express.Router();


userRoutes.get('/user/home',userAuthentication.userHomeAuthentication, userControllers.home);
userRoutes.get('/user/home/signout',userAuthentication.userHomeAuthentication, userControllers.signOut);



module.exports = userRoutes;