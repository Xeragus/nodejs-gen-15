const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  company: {
    ref: 'company',
    type: mongoose.Types.ObjectId
  }
}, { timestamps: true });

module.exports = mongoose.model('employee', employeeSchema);
