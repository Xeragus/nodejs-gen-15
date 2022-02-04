var express = require('express');
var router = express.Router();
const Employee = require('../models/employee');

// CRUD operations: Create Read Update Delete
// TODO: Refactor, delegate to controller

router.get('/', async (req, res) => {
        // TODO: Should return all employees
        // employees -> db.employees.find()
        if (req.query.first_name && req.query.last_name) {
          const employees = await Employee.find({
            first_name: req.query.first_name,
            last_name: req.query.last_name
          }).populate('company');

          res.send({
            error: false,
            message: `All employees with first name ${req.query.first_name} and last name ${req.query.last_name}`,
            employees: employees
          });
          return;
        }

        const employees = await Employee.find().populate('company', 'name');

        res.send({
          error: false,
          message: 'All employees from the database',
          employees: employees
        });
      })
      .get('/:id', async (req, res) => {
        // TODO: Return one employee by id
        const employee = await Employee.findById(req.params.id);

        res.send({
          error: false,
          message: `Employee with id #${employee._id}, named ${employee.first_name} ${employee.last_name}, has been fetched`,
          employee: employee
        });
      })
      .get('/:id/company', async (req, res) => {
        // TODO: Return one employee's company by employee id
        const employee = await Employee.findById(req.params.id).populate('company');

        res.send({
          error: false,
          message: `Company of employee with id #${employee._id} has been fetched`,
          company: employee.company
        });
      })
      .post('/', async (req, res) => {
        // TODO: Create new employee
        const employee = await Employee.create(req.body);

        res.send({
          error: false,
          message: 'New employee has been created',
          employee: employee
        });
      })
      .patch('/:id', async (req, res) => {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        const employee = await Employee.findById(req.params.id);

        res.send({
          error: false,
          message: `Employee with id #${employee._id} has been updated`,
          employee: employee
        });
      })
      .delete('/:id', async (req, res) => {
        // TODO: Delete an employee
        await Employee.findByIdAndDelete(req.params.id);
        
        res.send({
          error: false,
          message: `Employee with id #${req.params.id} has been deleted`
        });
      })

module.exports = router;
