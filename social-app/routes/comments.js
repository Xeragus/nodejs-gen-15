var express = require('express');
var router = express.Router();
const controller = require('../controllers/commentController');

router
  .get('/', controller.getAll)
  .post('/:id', controller.postCreate)
  .get('/:id', controller.getById)
  .post('/:id/update', controller.postUpdate)
  .delete('/:id', controller.getDeleted);

module.exports = router;
