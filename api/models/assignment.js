const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  score_earned: {
    type: String
  },
  score_total: {
    type: String
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = schema
