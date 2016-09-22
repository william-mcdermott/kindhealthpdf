var React = require('react');
var axios = require('axios');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');
var FieldList = require('FieldList');
var SelectedFields = require('SelectedFields')
var $ = require('jquery');
var _ = require('lodash');

var varNamesList = require('../../data/varNames.js')()

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
        mapPairs: [],
      }
    }
  },
  handleSubmitFields: function () {
    // var {selectedFields, dataFields, chosenFields} = this.state;
    var fdfArray = "fdfNames"
    var varArray = "varNames"
    var to_array = "mapPairs"
    var newSelected = {}
    var newDataList = {}
    var array_names = ["fdfNames", "varNames", "mapPairs"]
    // var excluded_names = [];
    // if (array_names.indexOf(fdfArray)) {
    //   excluded_names = _.difference(array_names, [fdfArray])
    // }
    // excluded_names.forEach((name) => {
    //   newSelected[name] = this.state.selected[name];
    //   newDataList[name] = this.state.dataList[name];
    // })

    array_names.forEach((name) => {
      newSelected[name] = this.state.selected[name];
      newDataList[name] = this.state.dataList[name];
    })
      if (newSelected[varArray].length === 0) {
        console.log("error no selected vars");
      }
    // Take selected out of data field
    var tempArray = []
    newSelected[fdfArray].forEach((index) => {
      newDataList[fdfArray].splice(newDataList[fdfArray].indexOf(index), 1)
      tempArray.push(index);
    });
    var vIndex = newSelected[varArray][0];
    tempArray.forEach((index) => {
      var newValue = ''

      newValue = '' + newDataList[fdfArray][index] + ' : ' + newDataList[varArray][vIndex]
      console.log(vIndex);
      console.log(newDataList[varArray][vIndex]);
      newDataList[to_array].push(newValue);
    });

    // Clear selected fields object
    newSelected[fdfArray]=[]

    this.setState({
      selected: newSelected,
      dataList: newDataList,
    });
    $('.disabled').toggleClass('disabled');

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
          varNames: varNamesList,
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
  handleToggleField: function (fieldIndex, listId) {
    var fdfArray = "fdfNames"
    var varArray = "varNames"
    var to_array = "mapPairs"
    var newSelected = {}
    var newDataList = {}
    var array_names = ["fdfNames", "varNames", "mapPairs"]
    array_names.forEach((name) => {
      newSelected[name] = this.state.selected[name];
      newDataList[name] = this.state.dataList[name];
    })
    console.log(listId);
    // var fieldIndex = this.state.selected[listId].indexOf(fieldName)
    if (fieldIndex === -1){
      newSelected[listId].push(fieldIndex)
    } else {
      newSelected[listId].splice(fieldIndex, 1)
    };
    this.setState({
      selected: newSelected,
      dataList: newDataList,
    });

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
            {/*<PdfForm selectedFields={this.state.selectedFields} showInputs={this.state.showInputs} onSubmit={this.handleSubmit}/>*/}
          </div>
        </div>
        <div className="row">
          <div className="small-5 columns">
            <button className="button right" onClick={this.handleSubmitFields}>Button</button>
          </div>
          <div className="small-4 columns">
            <button className="button right">button</button>
          </div>
          <div className="small-9 columns">
            {/*<PdfForm selectedFields={this.state.selectedFields} showInputs={this.state.showInputs} onSubmit={this.handleSubmit}/>*/}
          </div>
        </div>
        <div className="row">
          <div className="small-4 columns">
            <FieldList onToggleField={this.handleToggleField} listId="fdfNames" selectedFields={this.state.selected.fdfNames} dataFields={this.state.dataList.fdfNames}/>
          </div>
          <div className="small-4 columns">
            <FieldList onToggleField={this.handleToggleField} listId="varNames" selectedFields={this.state.selected.varNames} dataFields={this.state.dataList.varNames}/>
          </div>
          <div className="small-4 columns">
            <FieldList onToggleField={this.handleToggleField} listId="mapPairs" selectedFields={this.state.selected.mapPairs} dataFields={this.state.dataList.mapPairs}/>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = PdfMapper;
