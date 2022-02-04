const Company = require('../models/company')

const getAllCompanies = async (req, res) => {
  const companies = await Company.find();

  res.send({
    error: false,
    message: 'All companies from the database',
    companies: companies
  });
};

const getCompanyCreate = async (req, res) => {
  const company = await Company.create(req.body);

  res.send({
    error: false,
    message: 'New company has been created',
    company: company
  });
};

const getCompanyUpdate = async (req, res) => {
  await Company.findByIdAndUpdate(req.params.id, req.body);
  const company = await Company.findById(req.params.id);

  res.send({
    error: false,
    message: `Company with id #${company._id} has been updated`,
    company: company
  });
};

const getCompaniesDeleted = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  
  res.send({
    error: false,
    message: `Company with id #${req.params.id} has been deleted`
  });
};

module.exports = {
  getAllCompanies,
  getCompanyCreate,
  getCompanyUpdate,
  getCompaniesDeleted
}
