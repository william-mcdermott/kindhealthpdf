var React = require('react');
var axios = require('axios');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');
var FieldList = require('FieldList');
var SelectedFields = require('SelectedFields')
var $ = require('jquery');

var varNamesList = require('../../data/varNames.js')()
console.log(varNamesList)

var PdfMapper = React.createClass({
  getInitialState: function () {
    return {
      dataList: {
        fdfNames: [],
        varNames: [],
        mapPairs: []
      },
      selected: {
        fdfNames: [],
        varNames: [],
        mapPairs: []
      },
      selectedFields: [],
      dataFields:  [],
      chosenFields: []
    }
  },
  handleSubmitFields: function () {
    var {selectedFields, dataFields, chosenFields} = this.state;
    selectedFields.forEach((field) => {
      dataFields.splice(dataFields.indexOf(field), 1)
      chosenFields.push(field);
      console.log(dataFields);
      console.log(chosenFields);
    })
    this.setState({
      dataFields: dataFields,
      chosenFields: chosenFields,
      selectedFields: []
    })
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
  handleToggleField: function (fieldName) {
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
          </div>
          <div className="small-9 columns">
            <PdfForm selectedFields={this.state.selectedFields} showInputs={this.state.showInputs} onSubmit={this.handleSubmit}/>
          </div>
        </div>
        <div className="row">
          <div className="small-4 columns">
            <FieldList onSubmit={this.handleSubmitFields} onToggleField={this.handleToggleField} selectedFields={this.state.selectedFields} dataFields={this.state.dataFields}/>
          </div>
          <div className="small-4 columns">
            <SelectedFields chosenFields={this.state.chosenFields} />
          </div>
        </div>

      </div>
    );
  }
});

module.exports = PdfMapper;
