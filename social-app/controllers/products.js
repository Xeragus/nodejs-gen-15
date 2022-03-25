const Product = require('../models/product');
const response = require('../lib/response_handler');

const getProducts = async (req, res) => {
  const products = await Product.find();

  response(res, 200, 'List of all products', { products });
};

const create = async (req, res) => {
  const product = await Product.create(req.body);

  response(res, 201, 'New product created', { product });
};

const update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);

  response(res, 200, 'Product updated', { product });
};

const destroy = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).send('Product deleted!');
};

module.exports = {
  getProducts,
  create,
  update,
  destroy,
};
