var express = require('express');
var router = express.Router();
const controller = require('../controllers/orders');
const jwt = require('express-jwt');
const response = require('../lib/response_handler');

router.use(
  jwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  })
);

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'UnauthorizedError') {
    response(res, 401, 'Unauthorized access');
  }
});

router
  .get('/:id', controller.fetchOne)

module.exports = router;
