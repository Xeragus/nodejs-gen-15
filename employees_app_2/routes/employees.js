const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees');

// MVC Architecture: Model View Controller

router.get('/', controller.getEmployees)
      .get('/create', controller.getEmployeesCreate)
      .post('/create', controller.postCreateEmployee);

module.exports = router;
