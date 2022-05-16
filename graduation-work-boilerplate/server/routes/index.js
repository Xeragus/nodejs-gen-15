var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      })
      .get('/message', (req, res) => {
        res.send({
          message: 'Hello from the SERVER!!!'
        });
      })

module.exports = router;
