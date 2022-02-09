var express = require('express');
var router = express.Router();
const controller = require('../controllers/employees');

router.get('/', controller.getAll)
      .get('/create', controller.getCreate)
      .get('/:id', controller.getEdit)
      // .get('/:id/company', controller.getCompany)
      .post('/', controller.create)
      .post('/:id', controller.update)
      .delete('/:id', controller.delete)

module.exports = router;
