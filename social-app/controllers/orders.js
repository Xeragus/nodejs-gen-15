const ProductOrder = require('../models/product-order');
const Order = require('../models/order');
const response = require('../lib/response_handler');

module.exports = {
  fetchOne: async (req, res) => {
    const order = await Order.findById(req.params.id);

    const products = await ProductOrder.find({
      order: order.id
    }).populate('product');

    response(res, 200, 'Order details', {
      order: order,
      product: products
    })
  }
}