var express = require('express');
var router = express.Router();
const controller = require('../controllers/companies');

router.get('/', controller.getAll)
      .get('/create', controller.getCreate)
      .get('/:id', controller.getEdit)
      .post('/', controller.postCreate)
      .post('/:id', controller.update)
      .delete('/:id', controller.destroy)

module.exports = router;
