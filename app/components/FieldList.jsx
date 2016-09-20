var React = require('react');
var $ = require('jquery');
var classNames = require('classnames')

var FieldList = React.createClass({
  getInitialState: function () {
    return {
      jsxReturn: [],
      dataFields: this.props.dataFields
    }
  },
  handleClick: function (newField) {
    this.props.onAddField(newField)
    $('#' + newField).toggleClass('disabled');
  },
  componentWillReceiveProps: function () {
    this.setState({
      dataFields: this.props.dataFields
    })
    console.log(this.state);
  },
  render: function () {
    console.log(this.state);
    var {selectedFields} = this.props
    var {dataFields} = this.state
    var fieldClass = classNames({
      'disabled': selectedFields.indexOf(this) !== -1,
      'fieldName': true
    })
    var renderDataFields = function () {
      var dataFieldArray = Object.keys(dataFields);
      console.log(dataFieldArray);
      dataFieldArray.map((field) => {
        return (
          <div className={fieldClass} id={field} onClick={() => this.handleClick({field})}>{field}</div>
        )

      });
    };
    return (
      <div className="fieldList">
        {renderDataFields()}
      </div>
    )
  }
})

module.exports = FieldList;
