const Post = require('../models/post');
const axios = require('axios');
const responseHandler = require('../lib/response_handler');
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

// Definiraj roles i sto mozat da pravat
ac.grant('user').createOwn('post');
ac.deny('admin').createOwn('post');

const getAll = async (req, res) => {
  const catApiResponse = await axios.get(`${process.env.CAT_API_URL}/facts`);
  console.log(catApiResponse.data);
  
  const posts = await Post.find();
     
  res.send({
    error: false,
    message: `All posts from the database`,
    posts: posts
  });
};

const getById = async (req, res) => {

    const posts = await Post.findById(req.params.id);

    res.send({
      error: false,
      message: `Post with id #${posts._id}, has been fetched`,
      posts: posts,
    });
};
  
const postCreate = async (req, res) => {
  const permission = ac.can(req.user.role).createOwn('post');

  if(!permission.granted) {
    responseHandler(res, 401, `Cannot create posts with role: ${req.user.role}`);
    return;
  }

  const post = await Post.create(req.body);

  res.send({
    error: false,
    message: 'New post has been created',
    post: post
  });
};

const postUpdate = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  const post = await Post.findById(req.params.id);
                                                      
  res.send({
    error: false,
    message: `Post with id #${post._id} has been updated`,
    post: post
  });
};

const getDeleted = async (req, res) => {

  await Post.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `Post with id #${req.params.id} has been deleted`
  });
};

module.exports = { 
    getAll,
    getById, 
    postCreate, 
    postUpdate, 
    getDeleted
}