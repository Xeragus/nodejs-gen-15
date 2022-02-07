var express = require('express');
var router = express.Router();
const controller = require('../../controllers/api/employees');

// CRUD operations: Create Read Update Delete
// TODO: Refactor, delegate to controller

router.get('/', controller.getAll)
      .get('/:id', controller.getOne)
      .get('/:id/company', controller.getCompany)
      .post('/', controller.create)
      .patch('/:id', controller.update)
      .delete('/:id', controller.delete)

module.exports = router;
