const mongoose = require('mongoose');
const userSchema = require('../schemas/schema.user.js');


const userModel = mongoose.model('userModel', userSchema);g

module.exports = userModel;
