const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  employees: [{
    type: mongoose.Types.ObjectId,
    ref: 'employee'
  }]
}, { timestamps: true });

module.exports = mongoose.model('company', companySchema);
