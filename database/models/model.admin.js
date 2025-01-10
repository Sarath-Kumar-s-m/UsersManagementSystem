const mongoose = require('mongoose');
const adminSchema = require('../schemas/schema.admin.js');





const adminModel = mongoose.model('adminModel', adminSchema);

module.exports = adminModel;