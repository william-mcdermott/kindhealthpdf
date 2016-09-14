var React = require('react');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');

var PdfMapper = React.createClass({
  getInitialState: function () {
    return {
      showInputs: [0]
    }
  },
  handleStatusChange: function () {
    var newInput = `${this.state.showInputs.length}`
    this.setState({showInputs: this.state.showInputs.concat(newInput)});
  },
  render: function () {
    return (
      <div>
        <FormUpload />
        <PdfForm showInputs={this.state.showInputs} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = PdfMapper;
