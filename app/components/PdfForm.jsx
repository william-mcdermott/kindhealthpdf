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
    // if (showInputs && key.value.length) {
    //   this.state.keyValues[key.value] = value.value
    // }
    console.log(this.state);
  },
  render: function () {
    var {showInputs} = this.props
    var renderInputForm = () => {
      for (var i = showInputs; i >= 1; i--) {
        console.log(i);
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
        <p className="plus" onClick={this.onSubmit}>+</p>
        <form ref="form">
          {this.props.showInputs.map((item) => {
            return (
              <div key={item}>
                <input type="text" ref="key" placeholder="Enter Field Name"/>
                <input type="text" ref="value" placeholder="Enter Field Value"/>
              </div>
            )
          })}
          <button className="button">Submit Field & Value</button>
        </form>
      </div>
    );
  }
});

module.exports = PdfForm;
