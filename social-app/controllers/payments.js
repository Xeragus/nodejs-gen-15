const Order = require('../models/order');
const Payment = require('../models/payment');
const Transaction = require('../models/transaction');
const Product = require('../models/product');
const ProductOrder = require('../models/product-order');
const response = require('../lib/response_handler');


module.exports = {
  authorize: async (req, res) => {
    /**
     * 1. Create order
     * 
     * 2. Create payment
     * 
     * 3. Attach payment to order
     */
    var orderTotal = 0;
    let productsWithQuantity = [];

    for (const productFromReq of req.body.products) {
      const productFromDb = await Product.findById(productFromReq.id);

      if (productFromDb.stockQuantity < productFromReq.quantity) {
        response(res, 400, `Product ${productFromDb.name} ($${productFromDb.price}) with id #${productFromDb._id} is out of stock!`);
        return;
      }

      productsWithQuantity.push({
        product: productFromDb,
        quantity: productFromReq.quantity
      });

      orderTotal += (productFromDb.price * productFromReq.quantity);
    }

    const order = await Order.create({
      total: orderTotal,
      user: req.user.id
    });

    for (const productWithQuantity of productsWithQuantity) {
      // Action can be considered as adding a product to an order
      await ProductOrder.create({
        product: productWithQuantity.product._id,
        order: order._id,
        price: productWithQuantity.product.price,
        quantity: productWithQuantity.quantity
      });

      // Update the stock quantity of the product once it is reserved in an order
      await Product.findByIdAndUpdate(productWithQuantity.product._id, {
        stockQuantity: productWithQuantity.product.stockQuantity - productWithQuantity.quantity
      });
    };

    let payment = await Payment.create({ status: 'initialized', order: order._id });

    const transaction = await Transaction.create({
      action: 'authorization',
      amount: order.total,
      payment: payment._id
    });

    // TODO: Investigate why a transaction is not added to the payment's transactions array
    await Payment.findByIdAndUpdate(payment._id, {
      status: 'authorized',
      $push: { transactions: transaction._id }
    });

    payment = await Payment.findById(payment._id)

    res.send({
      order: order,
      payment: payment,
      transaction: transaction
    });
  },
  capture: async (req, res) =>{
    // Da se dodadat metodi za pravekje capture, void i refunds.
    // (hint: ne treba da kreirate nov payment, tuku soodvetno da go 
    // menuvate negoviot status i da dodavate novo kreirani transakcii, 
    // site akcii kako capture, void, refund treba da se cuvaat vo posebna 
    // transakcija isto kako sto ja cuvavme avtorizacijata vo posebna transakcija)
    
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
