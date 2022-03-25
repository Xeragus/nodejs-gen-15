const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);
