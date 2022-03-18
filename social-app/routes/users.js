var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');
const jwt = require('express-jwt');
const response = require('../lib/response_handler');
// PR (Pull Request) Example /// //
// ss
require('dotenv').config();

router.use(jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256'] 
}).unless({
      path: [
            {
                  url: '/users/login', methods: ['POST']
            },
            {
                  url: '/users', methods: ['POST']
            },
      ]
}));

router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
            response(res, 401, 'Unauthorized access');
      }
})

router.get('/', controller.getAll)
      .get('/:id', controller.getById)
      .post('/', controller.register)
      .post('/login', controller.login)
      .post('/:id/update', controller.postUpdate)
      .post('/:id/add-friend', controller.addFriend)
      .delete('/:id', controller.getDeleted)

module.exports = router;
