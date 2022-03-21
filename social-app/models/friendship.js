const mongoose = require('mongoose');

const friendshipSchema = mongoose.Schema(
  {
    user_one: {
      ref: 'user',
      type: mongoose.Types.ObjectId,
    },
    user_two: {
      ref: 'user',
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('friendship', friendshipSchema);
