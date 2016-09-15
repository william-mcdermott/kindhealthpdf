var React = require('react');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');
var FieldList = require('FieldList');
var $ = require('jquery');

$('.fieldName').click(function() {
  console.log(this);
  PdfMapper.handleAddField(this.innerHtml)
})

var PdfMapper = React.createClass({
  getInitialState: function () {
    return {
      showInputs: [0],
      selectedFields: [],
      keyValues: {}
    }
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
    return (
      <div>
        <div className="row">
          <div className="small-3 columns">
            <FormUpload />
            <FieldList onAddField={this.handleAddField} selectedFields={this.state.selectedFields}/>
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
