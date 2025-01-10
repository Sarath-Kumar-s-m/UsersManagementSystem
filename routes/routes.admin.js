/**
 * ThirdParty Dependencies
 */
const express = require('express');

/**
 * Custom module Dependencies
*/
const adminControllers = require('../controllers/controller.admin.js');
const adminAuthentication = require('../middlewares/authentications/auth.admin.js');
const validators = require('../middlewares/validations/validators.js')
const adminRoutes = express.Router();



adminRoutes.get('/admin/dashboard', adminAuthentication.adminDashBoardAuthentication, adminControllers.adminDashBoard);
adminRoutes.get('/admin/dashboard/api/v1/createuser', adminAuthentication.adminDashBoardAuthentication, adminControllers.createUser)
adminRoutes.post('/admin/dashboard/api/v1/createuser',adminAuthentication.adminDashBoardAuthentication, validators.checker, adminControllers.createUser);
adminRoutes.get('/admin/dashboard/api/v1/updateuser', adminAuthentication.adminDashBoardAuthentication, adminControllers.updateUser );
adminRoutes.post('/admin/dashboard/api/v1/updateuser',adminAuthentication.adminDashBoardAuthentication, validators.checker, adminControllers.updateUser);
adminRoutes.get('/admin/dashboard/api/v1/deleteuser', adminAuthentication.adminDashBoardAuthentication, adminControllers.deleteUser);
adminRoutes.post('/admin/dashboard/api/v1/searchuser', adminAuthentication.adminDashBoardAuthentication, adminControllers.searchUser);
adminRoutes.get('/admin/dashboard/logout', adminAuthentication.adminDashBoardAuthentication, adminControllers.logOut);


module.exports = adminRoutes;