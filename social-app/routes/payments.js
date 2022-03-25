var express = require('express');
var router = express.Router();
const controller = require('../controllers/payments');

router
  .post('/authorize', controller.authorize)
  .post('/capture/:id', controller.capture)
  .post('/void/:id', controller.void)
  .post('/refund/:id', controller.refund)

module.exports = router;
