const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
      type: 'string',
      required: true,
      default: 'user'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true,
    },
    role: {
      type: 'string',
      required: true,
      default: 'user'
    }
    
},
{
  timestamps: true
});


module.exports = userSchema;