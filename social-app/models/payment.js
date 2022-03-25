const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: 'order'
    },
    transactions: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'transaction'
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('payment', paymentSchema);
