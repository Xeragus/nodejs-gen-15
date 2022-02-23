var express = require('express');
var router = express.Router();
const controller = require('../controllers/importController');

router.post('/import', controller.importCsv)

module.exports = router;