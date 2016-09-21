var React = require('react');

var PdfForm = React.createClass({
  onSubmit: function (e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.value.value);
    var {showInputs} = this.props
    var {key, value} = this.refs
    this.refs.value.value = ''
    // if (showInputs && key.value.length) {
    //   this.state.keyValues[key.value] = value.value
    // }
  },
  render: function () {
    console.log(this.props);
    var {showInputs, selectedFields} = this.props
    return (
      <div>
        <form ref="form" onSubmit={this.onSubmit}>
          <input type="text" ref="value" placeholder="Enter Field Value"/>
          <button className="button">Submit Field & Value</button>
        </form>
      </div>
    );
  }
});

module.exports = PdfForm;
