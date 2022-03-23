const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const jwt = require('express-jwt');

require('dotenv').config();

router.use(
  jwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }).unless({
    path: [
      {
        url: '/products',
        methods: ['GET'],
      },
    ],
  })
);

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized access');
  }
});

router
  .get('/', controller.getProducts)
  .post('/', controller.create)
  .patch('/:id', controller.update)
  .delete('/:id', controller.destroy);

module.exports = router;
