var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAll)
      .post('/', controller.register)
      .post('/login', controller.login)
      .get('/:id', controller.getById)
      .post('/:id/update', controller.postUpdate)
      .delete('/:id', controller.getDeleted)

module.exports = router;