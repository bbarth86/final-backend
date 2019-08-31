const mongoose = require('mongoose')
const Assignment = require('./assignment')


/*
Model for User (Student or Admin)
  User's required values are username, first_name, last_name, email, password
  User may have admin privileges
  User may have assignments associated to them
*/

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  assignments: [Assignment]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)
