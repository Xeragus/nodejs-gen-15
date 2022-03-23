const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'payment',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('transaction', transactionSchema);
