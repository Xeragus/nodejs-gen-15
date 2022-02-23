const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
// const multer = require('multer');
// const csv = require('fast-csv');
// const upload = multer({ dest: 'helpers/files' });


var csvData=[];

const importCsv = async (req, res) => {
  fs.createReadStream('users.csv')
      .pipe(csv({}))
      .on('data', function(csvrow) {
          csvData.push(csvrow);        
      })
      .on('end',function() {
        console.log(csvData);
      });
};

module.exports = { importCsv };
