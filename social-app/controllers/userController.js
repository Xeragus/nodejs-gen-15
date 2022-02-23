const User = require('../models/user');
const bcrypt = require('bcryptjs');
const response = require('../lib/response_handler');

/**
 * Authentication steps
 * 
 * 1. User registration
 *  - user enters basic information, email, password
 * 2. User login
 *  - if credentials (email and password) are valid, return valid JWT token
 *  - if not, return an error message
 */

const getAll = async (req, res) => {
  const users = await User.find();
     
  res.send({
    error: false,
    message: `All users from the database`,
    users: users
  });
};

const getById = async (req, res) => {
  const users = await User.findById(req.params.id);

  res.send({
    error: false,
    message: `User with id #${users._id}, has been fetched`,
    users: users,
  });
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return response(res, 400, 'Bad request. User exists with the provided email.');
    }

    req.body.password = bcrypt.hashSync(req.body.password);

    user = await User.create(req.body);

    response(res, 201, 'New user has been created', { user })
  } catch (error) {
    return response(res, 500, error.msg);
  }
};

const postUpdate = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  const user = await User.findById(req.params.id);
                                                      
  res.send({
    error: false,
    message: `User with id #${user._id} has been updated`,
    user: user
  });
};

const getDeleted = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `User with id #${req.params.id} has been deleted`
  });
};

module.exports = { 
    getAll,
    getById, 
    register, 
    postUpdate, 
    getDeleted
}