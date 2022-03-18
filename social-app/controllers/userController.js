const User = require('../models/user');
const bcrypt = require('bcryptjs');
const response = require('../lib/response_handler');
const jwt = require('jsonwebtoken');
const Friendship = require('../models/friendship');

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
    response(res, 500, error.msg);
  }
};

const login = async (req, res) => {
  try {
    /**
     * Tuka korisnikot mi ispratil email i password
     * 1. Od baza probaj da zemes korisnik so dadeniot email
     * 2. Treba da proveram dali postoi korisnik so toj email
     * 2.a. Dokolku postoi, da gi sporedam password-ite
     * 2.a.1 Dokolku passwordite se ok, vrakjam token
     * 2.a.2 Dokolku passwordite ne se ok, vrakjam response za invalid credentials
     * 2.b. Dokolku ne postoi, da vratam nekakov response za invalid credentials
     */
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // token = plain data (JSON payload) + secret key za potpisuvanje na token + config options
        const payload = {
          id: user._id,
          email: user.email,
          first_name: user.first_name,
          role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: '50m'
        });

        response(res, 200, 'You have logged in successfully', { token })
      } else {
        response(res, 401, 'Invalid credentials');
      }
    } else {
      response(res, 401, 'Invalid credentials');
    }
  } catch (error) {
    response(res, 500, error.msg);
  }
}

const postUpdate = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  const user = await User.findById(req.params.id);
                                                      
  res.send({
    error: false,
    message: `User with id #${user._id} has been updated`,
    user: user
  });
};

const addFriend = async (req, res) => {
  console.log(req.user);
  try {
    const userTwo = await User.findById(req.params.id);
  
    if (!userTwo) {
      response(res, 404, 'Cannot add to friends a user that doesn\'t exist.');
      return;
    }

    const friendship = await Friendship.create({
      user_one: req.user.id,
      user_two: userTwo._id
    })

    response(res, 201, `User with id #${req.user.id} has added to friends user with id #${req.params.id}.`, { friendship })
  } catch (error) {
    response(res, 500, error.message, { error })
  }
}

const deleteFriend = async (req, res) => {
  try {
    // user koj brise req.user.id
    // drugiot user od friendship req.params.id
    // query: find frienship so user_one: req.user.id i user_two: req.params.id ILI
    // user_one: req.params.id i user_two: req.user.id
    await Friendship.findOneAndDelete({
      $or: [
        { 
          $and: [
            { user_one: req.user.id },
            { user_two: req.params.id }
          ] 
        },
        {
          $and: [
            { user_one: req.params.id },
            { user_two: req.user.id }
          ]
        }
      ]
    });

    response(res, 201, `User with id #${req.user.id} has deleted the friendship with user with id #${req.params.id}.`);
  } catch (error) {
    response(res, 500, error.message, { error });
  }
}

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
    login,
    postUpdate, 
    addFriend,
    deleteFriend,
    getDeleted
}