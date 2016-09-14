var React = require('react');

var PdfForm = require('PdfForm');
var FormUpload = require('FormUpload');

var PdfMapper = React.createClass({
  getInitialState: function () {
    return {
      showInputs: false
    }
  },
  componentDidUpdate: function (prevProps, prevState) {

  },
  handleStatusChange: function () {
    this.setState({showInputs: !this.state.showInputs});
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
