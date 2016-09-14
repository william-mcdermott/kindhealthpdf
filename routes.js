var parsedJSON = require('./data/fields.json');
var pdfFiller = require('pdffiller');


module.exports = (app) =>{

  app.post('/submitPdf', (req, res) => {
    console.log(req);
    // Extract PDF from res object

    // Run pdffiller to extract fields
    var FDF_data = pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, function(err, fdfData) {
      if (err) throw err;
      res.status(200).json(FDF_data);

    });

  });
};
