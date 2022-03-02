var express = require('express');
var router = express.Router();
const controller = require('../controllers/postController');
const jwt = require('express-jwt');
const response = require('../lib/response_handler');

router.use(jwt({
      secret: '1234',
      algorithms: ['HS256'] 
}).unless({
      path: [
            {
                  url: '/posts', methods: ['GET']
            }
      ]
}));

router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
            response(res, 401, 'Unauthorized access');
      }
})

router.get('/', controller.getAll)
      .post('/', controller.postCreate)
      .get('/:id', controller.getById)
      .post('/:id/update', controller.postUpdate)
      .delete('/:id', controller.getDeleted);

module.exports = router;