var React = require('react');
var axios = require('axios');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');
var FieldList = require('FieldList');
var SelectedFields = require('SelectedFields')
var $ = require('jquery');
var _ = require('lodash');

var varNamesList = require('../../data/varNames.js')()
console.log(varNamesList)

var PdfMapper = React.createClass({
  getInitialState: function () {
    return {
      selected: {
        fdfNames: [],
        varNames: [],
        mapPairs: []
      },
      dataList: {
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
    // var {selectedFields, dataFields, chosenFields} = this.state;
    var selected_array = "fdfNames"
    var to_array = "mapPairs"
    var newSelected = {}
    var newDataList = {}
    var array_names = ["fdfNames", "varNames", "mapPairs"]
    // var excluded_names = [];
    // if (array_names.indexOf(selected_array)) {
    //   excluded_names = _.difference(array_names, [selected_array])
    // }
    // excluded_names.forEach((name) => {
    //   newSelected[name] = this.state.selected[name];
    //   newDataList[name] = this.state.dataList[name];
    // })

    array_names.forEach((name) => {
      newSelected[name] = this.state.selected[name];
      newDataList[name] = this.state.dataList[name];
    })
    // var {fdfNames, varNames, mapPairs} = this.state.selected;
    // var {varNames, fdfNames, mapPairs} = this.state.dataList;

    // Take selected out of data field
    newSelected[selected_array].forEach((field) => {
      newDataList[selected_array].splice(newDataList[selected_array].indexOf(field), 1)
      newDataList[to_array].push(field);
    })
    // Clear selected fields object
    newSelected[selected_array]=[]

    this.setState({
      selected: newSelected,
      dataList: newDataList,
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
        dataList: {
          fdfNames: newFields,
          varNames: [],
          mapPairs: []
        }
      })
    })
    console.log(this.state);
  },
  // handleSubmit: function (submission) {
  //   this.state.selectedFields.forEach((field) => {
  //     this.state.keyValues[field] = submission;
  //   })
  //   console.log(this.state);
  // },
  handleToggleField: function (fieldName) {
    var fieldIndex = this.state.selected.fdfNames.indexOf(fieldName)
    if (fieldIndex === -1){
      this.state.selected.fdfNames.push(fieldName)
    } else {
      this.state.selected.fdfNames.splice(fieldIndex, 1)
    };
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
            <FieldList onSubmit={this.handleSubmitFields} onToggleField={this.handleToggleField} selectedFields={this.state.selected.fdfNames} dataFields={this.state.dataList.fdfNames}/>
          </div>
          <div className="small-4 columns">
            <SelectedFields chosenFields={this.state.dataList.varNames} />
          </div>
        </div>

      </div>
    );
  }
});

module.exports = PdfMapper;
