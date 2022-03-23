const Post = require('../models/post');
const Comment = require('../models/comment');
const responseHandler = require('../lib/response_handler');
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

// Definiraj roles i sto mozat da pravat
ac.grant('user').createOwn('post');
ac.deny('admin').createOwn('post');

module.exports = {
  getAll: async (req, res) => {
    const posts = await Post.find().populate('comments', 'content');
  
    res.send({
      error: false,
      message: `All posts from the database`,
      posts: posts,
    });
  },
  getById: async (req, res) => {
    const posts = await Post.findById(req.params.id);
  
    res.send({
      error: false,
      message: `Post with id #${posts._id}, has been fetched`,
      posts: posts,
    });
  },
  postCreate: async (req, res) => {
    const permission = ac.can(req.user.role).createOwn('post');
  
    if (!permission.granted) {
      responseHandler(
        res,
        401,
        `Cannot create posts with role: ${req.user.role}`
      );
      return;
    }
  
    const post = await Post.create(req.body);
  
    res.send({
      error: false,
      message: 'New post has been created',
      post: post,
    });
  },
  postUpdate: async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    const post = await Post.findById(req.params.id);
  
    res.send({
      error: false,
      message: `Post with id #${post._id} has been updated`,
      post: post,
    });
  },
  getDeleted: async (req, res) => {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndDelete(req.params.id);
    post.comments.forEach(async (commentId) => {
      await Comment.findByIdAndDelete(commentId);
    });
  
    res.send({
      error: false,
      message: `Post with id #${req.params.id} has been deleted`,
    });
  },
};
