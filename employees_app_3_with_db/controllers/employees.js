const Employee = require('../models/employee');
const Company = require('../models/company');

module.exports = {
  getAll: async (req, res) => {
    if (req.query.first_name && req.query.last_name) {
      const employees = await Employee.find({
        first_name: req.query.first_name,
        last_name: req.query.last_name
      }).populate('company');

      res.render('employees/index', { employees });
      return;
    }

    const employees = await Employee.find().populate('company', 'name');

    res.render('employees/index', { employees });
  },
  getCreate: async (req, res) => {
    const companies = await Company.find();

    res.render('employees/create', { companies });
  },
  getEdit: async (req, res) => {
    const employee = await Employee.findById(req.params.id).populate('company');
    const companies = await Company.find();

    res.render('employees/edit', { employee, companies });
  },
  // getCompany: async (req, res) => {
  //   // TODO: Return one employee's company by employee id
  //   const employee = await Employee.findById(req.params.id).populate('company');

  //   res.send({
  //     error: false,
  //     message: `Company of employee with id #${employee._id} has been fetched`,
  //     company: employee.company
  //   });
  // },
  create: async (req, res) => {
    if (req.body.company == '') {
      req.body.company = null;
    }

    const employee = await Employee.create(req.body);

    if (req.body.company) {
      await Company.findByIdAndUpdate(req.body.company, {
        $push: { employees: employee }
      });
    }

    res.redirect('/employees');
  },
  update: async (req, res) => {
    if (req.body.company == '') {
      req.body.company = null;
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);

    if (req.body.company) {
      let foundEmployees = await Company.find({ employees: employee });

      if (foundEmployees.length == 0) {
        await Company.findByIdAndUpdate(req.body.company, {
          $push: { employees: employee }
        });
      }
    }

    res.redirect('/employees');
  },
  delete: async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id); 
    
    res.send({});
  }
}
