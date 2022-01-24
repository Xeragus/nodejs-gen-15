const express = require('express')
const app = express()
const port = 3000

// Middleware
app.use(express.json());

/**
 * Da se napravi API sistem za menadziranje na vraboteni.
 * Sistemot treba da nudi ruti za dobivanje na site vraboteni,
 * kreiranje na nov vraboten,
 * dobivanje na vraboteni po profesija,
 * menuvanje na podatoci za vraboten,
 * brisenje na vraboten od sistemot.
 */

const employees = [];

// These params can be sent as part of the url
// 1. Route parameters
// 2. Query parameters

// facebook.com/kosta.petrov
// facebook.com/boban.sugareski54

// Naming of routes: Resource-based
app
  .get('/employees', (req, res) => {
    let filteredEmployees = employees;

    if (req.query.job_title) {
      filteredEmployees = employees.filter(employee => {
        return employee.job_title.toLowerCase() == req.query.job_title.toLowerCase()
      })
    }

    res.send({
      message: 'List of all employees',
      employees: filteredEmployees
    })
  })
  .get('/employees/:job_title', (req, res) => {
    let filteredEmployees = employees.filter(employee => {
      return employee.job_title.toLowerCase() == req.params.job_title.toLowerCase()
    })
    res.send({
      message: 'All employees with the job title of ' + req.params.job_title,
      employees: filteredEmployees
    })
  })
  .post('/employees', (req, res) => {
    employees.push(req.body);
    res.send({
      message: 'New employee with the name of ' + req.body.name + ' is added to the database.',
      employees: employees
    })
  })

app.listen(port, () => {
  console.log(`Semos Academy hello world app listening at http://localhost:${port}`)
});
