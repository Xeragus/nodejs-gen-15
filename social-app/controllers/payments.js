const Payment = require('../models/payment');
const Transaction = require('../models/transaction');

module.exports = {
  authorize: async (req, res) => {
    /**
     * 1. Kreirame payment object so status 'initialized'
     * 2. Kreirame authorization transaction i ja povrzuvame so payment
     * 3. Ja dodavme avtorizaciskata transakcija vo nizata na transakcii na payment-ot
     *  i mu go menuvame statusot vo 'authorized'
     */
    // req.body = { amount: '15.99' }
    const payment = await Payment.create({ status: 'initialized' });

    const transaction = await Transaction.create({
      action: 'authorization',
      amount: req.body.amount,
      payment: payment._id
    });

    await Payment.findByIdAndUpdate(payment._id, {
      status: 'authorized',
      $push: { transaction: transaction._id }
    });

    res.send({
      payment: payment,
      transaction: transaction
    });
  }
}
