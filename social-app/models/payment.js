const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true
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
