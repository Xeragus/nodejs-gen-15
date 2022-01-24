var express = require('express');
var router = express.Router();

const employees = [
  {
    first_name: 'Boban',
    last_name: 'Sugareski',
    job_title: 'Engineer'
  },
  {
    first_name: 'Milenko',
    last_name: 'Nedelkovski',
    job_title: 'Offroad Specialist'
  }
];

router.get('/', (req, res) => {
        res.render('employees/index', { employees });
      })
      .get('/create', (req, res) => {
        res.render('employees/create');
      })
      .post('/create', (req, res) => {
        employees.push(req.body);

        res.redirect('/employees');
      });

module.exports = router;

// { employees } -> { employees: employees }