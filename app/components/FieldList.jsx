var React = require('react');
var $ = require('jquery');
var classNames = require('classnames')

var FieldList = React.createClass({
  getInitialState: function () {
    return {
      jsxReturn: [],
      dataFields: ['Name', 'Address'],
      dataFieldArray: []
    }
  },
  handleClick: function (newField, index) {
    this.props.onAddField(newField)
    $('#' + index).toggleClass('disabled');
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      dataFields: nextProps.dataFields
    })
    console.log(this.props);
  },
  render: function () {

    var {selectedFields} = this.props
    var {dataFields} = this.state
    console.log(this.props);
    var fieldClass = classNames({
      'disabled': selectedFields.indexOf(this) !== -1,
      'fieldName': true
    })
    var that = this;
    var renderDataFields = function () {
      console.log(dataFields);
      return dataFields.map((field) => {
        return (
          <div key={dataFields.indexOf(field)} className={fieldClass} id={dataFields.indexOf(field)} onClick={() => that.handleClick(field, dataFields.indexOf(field))}>{field}</div>
          // <div key={dataFields.indexOf(field)} className="fieldName">{field}</div>
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
