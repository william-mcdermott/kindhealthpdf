var React = require('react');

var PdfForm = React.createClass({
  getInitialState: function () {
    return {
      keyValues: {

      }
    }
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.props.onStatusChange();
    var {showInputs} = this.props
    var {key, value} = this.refs
    if (showInputs && key.value.length) {
      this.state.keyValues[key.value] = value.value
    }
    console.log(this.state);
  },
  render: function () {
    var {showInputs} = this.props
    var buttonText = 'Add'
    var renderInputForm = () => {
      console.log(showInputs);
      if (showInputs == true) {
        buttonText = 'Submit'
        return (
          <div>
            <input type="text" ref="key" placeholder="Enter Field Name"/>
            <input type="text" ref="value" placeholder="Enter Field Value"/>
          </div>
        );
      }
    };
    return (
      <div>
        <form ref="form" onSubmit={this.onSubmit}>
          {renderInputForm()}
          <button className="button">{buttonText} Field & Value</button>
        </form>
      </div>
    );
  }
});

module.exports = PdfForm;
