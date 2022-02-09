const Company = require('../models/company')

const getAll = async (req, res) => {
  const companies = await Company.find();

  res.render('companies/index', { companies });
};

const getCreate = (req, res) => {
  res.render('companies/create');
};

const getEdit = async (req, res) => {
  const company = await Company.findById(req.params.id);

  res.render('companies/edit', { company });
}

const postCreate = async (req, res) => {
  console.log(req.body);
  await Company.create(req.body);

  res.redirect('/companies');
};

const update = async (req, res) => {
  await Company.findByIdAndUpdate(req.params.id, req.body);

  res.redirect('/companies');
};

const destroy = async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);

  res.status(200).send({});
};

module.exports = {
  getAll,
  getCreate,
  getEdit,
  postCreate,
  update,
  destroy
}
