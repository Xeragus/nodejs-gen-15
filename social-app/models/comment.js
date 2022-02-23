const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('comment', commentSchema);