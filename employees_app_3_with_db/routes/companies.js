var express = require('express');
var router = express.Router();
const controller = require('../controllers/companies');

router.get('/', controller.getAll)
      .get('/create', controller.getCreate)
      .post('/', controller.postCreate)
      .patch('/:id', controller.getUpdate)
      .delete('/:id', controller.getDeleted)

module.exports = router;
