const express = require('express');
const rootControllers = require('../controllers/controller.root.js');

const rootRoutes = express.Router();


rootRoutes.get('/', rootControllers);

module.exports = rootRoutes;