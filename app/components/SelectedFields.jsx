var React = require('react');
var $ = require('jquery');
var classNames = require('classnames')

var FieldList = React.createClass({
  getInitialState: function () {
    return {
      selectedFieldArray: [],
      chosenFields: this.props.chosenFields
    }
  },
  getDefaultProps: function () {
    return {
      chosenFields: []
    }
  },
  // handleClick: function (newField, index) {
  //   this.props.onAddField(newField)
  //   $('#' + index).toggleClass('disabled');
  // },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      chosenFields: nextProps.chosenFields
    })
    console.log(this.props);
  },
  render: function () {
    var {chosenFields} = this.props
    var that = this;
    var renderSelectedFields = function () {
      return chosenFields.map((field) => {
        return (
          <div key={chosenFields.indexOf(field)} className="fieldName" id={chosenFields.indexOf(field)} onClick={() => that.handleClick(field, dataFields.indexOf(field))}>{field}</div>
          // <div key={dataFields.indexOf(field)} className="fieldName">{field}</div>
        )
      });
    };
    return (
      <div className="fieldList">
        {renderSelectedFields()}
      </div>
    )
  }
})

module.exports = FieldList;
