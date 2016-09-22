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
      // Selected values from the dataList
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
  // Check all selected indices from
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
    // Take selected out of the fdf dataList field
    newSelected[fdfArray].forEach((value) => {
      newDataList[fdfArray].splice(newDataList[fdfArray].indexOf(value), 1)
    });

    var selectedVar = newSelected[varArray][0];
    newSelected[fdfArray].forEach((value) => {
      var newValue = ''

      newValue = value+ ' : ' + selectedVar
      newDataList[to_array].unshift(newValue);
    });

    // Clear selected fdf
    newSelected[fdfArray]=[]
    // Clear selected vars
    newSelected[varArray]=[]

    this.setState({
      selected: newSelected,
      dataList: newDataList,
    });

    $('.disabled').toggleClass('disabled');

  },
  handleRemovePair: function () {
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
    // Add selected back to dataList
    newSelected[to_array].forEach((value) => {
      var valueToPush = value.split(' : ')[0]
      newDataList[fdfArray].unshift(valueToPush)
    });

    newSelected[to_array].forEach((value) => {
      newDataList[to_array].splice(newDataList[to_array].indexOf(value), 1)
    });

    // clear selected mapPairs
    newSelected[to_array]=[];

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
    handleTestPdf: function (file) {
    var pdfMap = []

    axios.post('/testPdf').then(function(response) {
      console.log("Downloading file...");
      console.log(response)
      // Maybe return a URL to open in a new tab
    })
  },
  // Add, or remove the index from the "selected" array
  handleToggleField: function (field, listId) {
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
    //console.log("ToggleField fieldIndex", fieldIndex);
    // Check if the fieldIndex has been added to the selected array
    var foundIndex = this.state.selected[listId].indexOf(field)
    if (foundIndex === -1){
      newSelected[listId].push(field)
      console.log("pushed ", field)
    } else {
      newSelected[listId].splice(newSelected[listId].indexOf(field), 1)
      console.log("spliced ", field)

    };
    this.setState({
      selected: newSelected,
      dataList: newDataList,
    });

  },
  handleFindSimilar: function () {
    if (this.state.selected.mapPairs.length !== 1) {
      alert('Please select exactly one map pair to search')
    } else {
      var fieldToCheck = this.state.selected.mapPairs[0].split(' : ')[0]
      var varYouPicked = this.state.selected.mapPairs[0].split(' : ')[1]
      console.log(fieldToCheck);
      var arrayToCheck = this.state.dataList.fdfNames;
      var similarFields = arrayToCheck.filter((item) => {
        return item.indexOf(fieldToCheck) !== -1
      });
      similarFields.forEach((field) => {
        $('#fdfNames' + this.state.dataList.fdfNames.indexOf(field)).toggleClass('disabled');
        this.handleToggleField(field, 'fdfNames')
      })
      this.handleToggleField(varYouPicked, 'varNames');
      $('#varNames' + this.state.dataList.varNames.indexOf(varYouPicked)).toggleClass('disabled');
    }
  },
  render: function () {
    console.log(this.state);
    var that = this
    var renderNumberSelected = function (listId) {
      var selectedNamesLength = that.state.selected[listId].length
      var namesLength = that.state.dataList[listId].length
      var fdfNamesLength = that.state.dataList.fdfNames.length
      if (fdfNamesLength) {
        return (
          <p>Number of fields selected: {selectedNamesLength}</p>
        )
      }
    };
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
          <div className="small-4 columns">
            <p></p>
          </div>
          <div className="small-4 columns">
            <button className="button" onClick={this.handleSubmitFields}>Add pair</button>
          </div>
          <div className="small-4 columns">
            <button className="button right" onClick={this.handleRemovePair}>Remove pair</button>
            <button className="button" onClick={this.handleFindSimilar}>Find similar</button>
            <button className="button right" onClick={this.handleTestPdf}>Test PDF map</button>
          </div>
        </div>
        <div className="row">
          <div className="small-4 columns">
            {renderNumberSelected('fdfNames')}
            <FieldList onToggleField={this.handleToggleField} listId="fdfNames" selectedFields={this.state.selected.fdfNames} dataFields={this.state.dataList.fdfNames}/>
          </div>
          <div className="small-4 columns">
            {renderNumberSelected('varNames')}
            <FieldList onToggleField={this.handleToggleField} listId="varNames" selectedFields={this.state.selected.varNames} dataFields={this.state.dataList.varNames}/>
          </div>
          <div className="small-4 columns">
            {renderNumberSelected('mapPairs')}
            <FieldList onToggleField={this.handleToggleField} listId="mapPairs" selectedFields={this.state.selected.mapPairs} dataFields={this.state.dataList.mapPairs}/>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = PdfMapper;
