const mongoose = require('mongoose');

const { Schema } = mongoose;


const adminSchema = new Schema({
    name: {
      type: "String",
      required: true
    },
    email: {
      type: "String",
      required: true,
      unique: true
    },
    password: {
      type: "String",
      minLength: 8,
      required: true
    },
    role: {
      type:"String",
      required: true,
    }
},
{
  timestamps: true
});



module.exports = adminSchema;