var React = require('react');
var axios = require('axios');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');
var FieldList = require('FieldList');
var $ = require('jquery');


var PdfMapper = React.createClass({
  getInitialState: function () {
    return {
      selectedFields: [],
      dataFields:  [],
      keyValues: {}
    }
  },
  handlePdfSubmit: function (file) {
    var newFields = []
    var data = new FormData
    var that = this
    data.append('file', file)
    axios.post('/submitPdf', data).then(function(response) {
      console.log("FDF data", response.data);
      newFields = Object.keys(response.data);
      that.setState({
        dataFields: newFields
      })
    })
    console.log(this.state);
  },
  handleSubmit: function (submission) {
    this.state.selectedFields.forEach((field) => {
      this.state.keyValues[field] = submission;
    })
    console.log(this.state);
  },
  handleAddField: function (fieldName) {
    var fieldIndex = this.state.selectedFields.indexOf(fieldName)
    if (fieldIndex === -1){
      this.state.selectedFields.push(fieldName)
    } else {
      this.state.selectedFields.splice(fieldIndex, 1)
    };
    console.log(this.state.selectedFields);
  },
  render: function () {
    console.log(this.state);
    return (
      <div>
        <div className="row">
          <div className="small-3 columns">
            <FormUpload onSubmit={this.handlePdfSubmit}/>
            <FieldList onAddField={this.handleAddField} selectedFields={this.state.selectedFields} dataFields={this.state.dataFields}/>
          </div>
          <div className="small-9 columns">
            <PdfForm selectedFields={this.state.selectedFields} showInputs={this.state.showInputs} onSubmit={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PdfMapper;
