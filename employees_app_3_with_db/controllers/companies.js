const Company = require('../models/company')

const getAll = async (req, res) => {
  const companies = await Company.find();

  res.render('companies/index', { companies });
};

const getCreate = (req, res) => {
  res.render('companies/create');
};

const postCreate = async (req, res) => {
  console.log(req.body);
  await Company.create(req.body);

  res.redirect('/companies');
};

const getUpdate = async (req, res) => {
  await Company.findByIdAndUpdate(req.params.id, req.body);
  const company = await Company.findById(req.params.id);

  res.send({
    error: false,
    message: `Company with id #${company._id} has been updated`,
    company: company
  });
};

const getDeleted = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  
  res.send({
    error: false,
    message: `Company with id #${req.params.id} has been deleted`
  });
};

module.exports = {
  getAll,
  getCreate,
  postCreate,
  getUpdate,
  getDeleted
}
