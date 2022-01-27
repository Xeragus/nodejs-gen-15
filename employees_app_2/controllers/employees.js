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

module.exports = {
  getEmployees: (req, res) => {
    res.render('employees/index', { employees });
  },
  getEmployeesCreate: (req, res) => {
    res.render('employees/create');
  },
  postCreateEmployee: (req, res) => {
    employees.push(req.body);

    res.redirect('/employees');
  }
}
