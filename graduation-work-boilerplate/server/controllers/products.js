const mongoose = require('mongoose');
const Product = require('../models/product');


module.exports ={
  getAllProducts:
  async (req, res) => {
    const products = await Product.find();
    res.send({
      error: false,
      message: 'All productsts from the database',
      products: products
    });
  },
  getIDProduct:
  async (req, res) =>{
    const product = await Product.findById(req.params.id);
    res.send({
      error:false,
      message: `Product with id #${product._id}`,
      product : product
    });
  },

  create:
  async (req, res) => {
    const product = await Product.create(req.body);
    res.send({
      error: false,
      message: 'New post has been created',
      product: product
    });
  },

  patch:
  async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    const product = await Product.findById(req.params.id);
    res.send({
      error: false,
      message: `Product with id #${product._id} has been updated`,
      product: product
    });
  },

  delete:
  async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      error: false,
      message: `Product with id #${req.params.id} has been deleted`
    });
  }
}