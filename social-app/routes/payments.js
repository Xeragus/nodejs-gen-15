var express = require('express');
var router = express.Router();
const controller = require('../controllers/payments');

router
  .post('/authorize', controller.authorize)

module.exports = router;
