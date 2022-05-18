var express = require('express');
var router = express.Router();
const controller = require('../controllers/products');


router.get('/', controller.getAllProducts)
      .get('/:id', controller.getIDProduct)
      .post('/', controller.create)
      .patch('/:id', controller.patch)
      .delete('/:id', controller.delete)

module.exports = router;