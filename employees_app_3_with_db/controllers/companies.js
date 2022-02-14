const Company = require('../models/company')
const PDFPrinter = require('pdfmake');

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

const getView = async (req, res) => {
  const company = await Company.findById(req.params.id).populate('employees');

  res.render('companies/view', { company });
} 

const print = async (req, res) => {
  const company = await Company.findById(req.params.id).populate('employees');

  var fonts = {
        Roboto: {
              normal: 'fonts/Roboto-Regular.ttf',
              bold: 'fonts/Roboto-Medium.ttf',
              italics: 'fonts/Roboto-Italic.ttf',
              bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
  };

  const printer = new PDFPrinter(fonts);
  var fs = require('fs');

  let pdfBody = [['Name', 'Position']];
  
  company.employees.forEach(employee => {
    pdfBody.push([`${employee.first_name} ${employee.last_name}`, employee.position]);
  });

  var docDefinition = {
        content: [
              { text: `Company with id #${company._id}` },
              { text: `Name: ${company.name}` },
              `Address: ${company.address}`,
              'Employees:',
              {
                    table: {
                          body: pdfBody
                    }
              }
        ]
  };

  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('tables.pdf'));
  pdfDoc.end();

  res.redirect(`/companies/${company._id}/view`);
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
  getView,
  print,
  postCreate,
  update,
  destroy
}
