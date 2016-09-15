var parsedJSON = require('./data/fields.json');
var pdfFiller = require('pdffiller');
var fs = require('fs');

module.exports = (app) =>{

  app.post('/submitPdf', function (req, res) {
    if (!req.files) {
      res.send('No files were uploaded.')
      return
    }
    let sampleFile = req.files.file
    console.log(sampleFile.mv);
    if (!sampleFile) {
      res.status(500).send('err')
      return
    }else {
      var nameRegex = null;
      // Here instead of write a file, do your PDF map work, return the fields
      var FDF_data = pdfFiller.generateFDFTemplate(sampleFile, nameRegex, function(err, fdfData) {
        if (err) throw err;
        res.status(200).json(FDF_data);
      // Instead of send this, send your JSON field data
      // res.send('File uploaded!')
    });
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
