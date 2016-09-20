'use strict'

var parsedJSON = require('./data/fields.json');
var pdfFiller = require('pdffiller');
var fs = require('fs');
var tmp_dir = 'tmp/';

module.exports = (app) =>{

  app.post('/submitPdf', function (req, res) {
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    let sampleFile = req.files.file;

    if (!sampleFile) {
      return res.status(500).send('err');

    } else {

      // try to run code that might fail disastrously
      try {
        let writeFilePath = tmp_dir+sampleFile.name;
        // Have to save the file for the pdftk bin
        fs.writeFile(writeFilePath, sampleFile.data, function (err) {
          if (err) return console.log(err);
          console.log('File written');
          var nameRegex = null;
          // Here instead of write a file, do your PDF map work, return the fields
          pdfFiller.generateFDFTemplate(writeFilePath, nameRegex, function (err, fdfData) {
            if (err) throw err;
            console.log("FDF fields parsed");
            return res.status(200).json(fdfData);
          });
        });

      } catch(err) { // if something goes wrong in the try, return 500
        console.log(err);
        return res.status(500).json("Server failed to parse PDF");
      }

    }
  });

    // console.log(file);
    // Extract PDF from res object

    // Run pdffiller to extract fields
    // var FDF_data = pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, function(err, fdfData) {
    //   if (err) throw err;
    //   res.status(200).json(FDF_data);
    //
    // });

};
