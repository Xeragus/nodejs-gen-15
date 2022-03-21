const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../models/post');

const getAll = async (req, res) => {
  const comments = await Comment.find();

  res.send({
    error: false,
    message: `All comments from the database`,
    comments: comments,
  });
};

const getById = async (req, res) => {
  const comments = await Comment.findById(req.params.id);

  res.send({
    error: false,
    message: `Comment with id #${comments._id}, has been fetched`,
    comments: comments,
  });
};

const postCreate = async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    post: req.params.id,
  });

  await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment._id },
  });

  res.send({
    error: false,
    message: 'New comment has been created',
  });
};

const postUpdate = async (req, res) => {
  await Comment.findByIdAndUpdate(req.params.id, req.body);
  const comment = await Comment.findById(req.params.id);

  res.send({
    error: false,
    message: `Comment with id #${post._id} has been updated`,
    comment: comment,
  });
};

const getDeleted = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `Comment with id #${req.params.id} has been deleted`,
  });
};

module.exports = {
  getAll,
  getById,
  postCreate,
  postUpdate,
  getDeleted,
};
