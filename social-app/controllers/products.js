const Product = require('../models/product');

const getProducts = async (req, res) => {
  const productList = await Product.find();

  res.status(200).send(productList);
};

const create = async (req, res) => {
  await Product.create(req.body);
  res.status(200).send('Product created!');
};

const update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send('Product updated!');
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
