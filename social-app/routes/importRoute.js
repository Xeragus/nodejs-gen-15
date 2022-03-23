var express = require('express');
var router = express.Router();
const controller = require('../controllers/imports');

router.post('/import', controller.importCsv);

module.exports = router;
