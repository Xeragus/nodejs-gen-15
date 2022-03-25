const mongoose = require('mongoose');

const productOrderSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: 'order',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductOrder', productOrderSchema);
