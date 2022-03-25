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
  },
  capture: async (req, res) =>{
    // Da se dodadat metodi za pravekje capture, void i refunds.
    // (hint: ne treba da kreirate nov payment, tuku soodvetno da go 
    //   menuvate negoviot status i da dodavate novo kreirani transakcii, 
    //   site akcii kako capture, void, refund treba da se cuvaat vo posebna 
    //   transakcija isto kako sto ja cuvavme avtorizacijata vo posebna transakcija)
    
    const transaction = await Transaction.create({
      action: 'capture',
      amount: req.body.amount,
      payment: req.params.id

    });

    await Payment.findByIdAndUpdate(req.params.id,{
      status:'captured'
    });

    res.send({
      transaction: transaction
    });
  },
  void: async (req, res) =>{
    const transaction = await Transaction.create({
      action: 'void',
      amount: req.body.amount,
      payment: req.params.id
    });


    await Payment.findByIdAndUpdate(req.params.id,{
      status:'declined'
    });

    res.send({
      transaction: transaction
    });
  },
  refund: async (req, res) =>{
    const transaction = await Transaction.create({
      action: 'refund',
      amount: req.body.amount,
      payment: req.params.id
    });

    await Payment.findByIdAndUpdate(req.params.id,{
      status:'refunded'
    });

    res.send({
      transaction: transaction
    });
  }
}
