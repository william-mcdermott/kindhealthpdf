const pdfFiller   = require('pdffiller'),
      _ = require('lodash'),
      jsonfile = require('jsonfile'),
      fs = require('fs')

var read_path = "test/PDF/"
var write_path = "test/PDF/tmp/"

var blankPDF = read_path+"blank.pdf"
var destinationJSON = write_path+"fields.json"
var destinationPDF = write_path+"result.pdf"


const cleanUpFiles = () => {
    fs.access(destinationJSON, (err) => {
        if(!err)
            fs.unlinkSync(destinationJSON)
    });

    fs.access(destinationPDF, (err) => {
        if(!err)
            fs.unlinkSync(destinationJSON)
    });
}

// clean up old test files
cleanUpFiles();


var nameRegex = null;  
//Rip the fields from an existing form
pdfFiller.generateFDFTemplate( blankPDF, nameRegex, (err, fdfData) => {
    if (err) throw err;

    // FDF is a JSON of field data - - Field Data Format
    jsonfile.writeFileSync(destinationJSON, fdfData)
    console.log("Saved file: ", destinationJSON)

    let template_file = _.cloneDeep(fdfData);
    template_file["Applicant Name"] = "Aristotle"

    var shouldFlatten = false;
    pdfFiller.fillFormWithFlatten( blankPDF, destinationPDF, template_file, shouldFlatten, (err) => {
        if (err) throw err;
        
        console.log("Saved file: ", destinationPDF)
    })

})