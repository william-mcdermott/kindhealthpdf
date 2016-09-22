var React = require('react');
var $ = require('jquery');
var classNames = require('classnames')

var FieldList = React.createClass({

  handleClick: function (field, index) {
    this.props.onToggleField(field, this.props.listId)
    // var fieldClass = classNames({
    //   'disabled': selectedFields.indexOf(newField) != -1,
    //   'fieldName': true
    // })
    $('#' + this.props.listId + index).toggleClass('disabled');
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      dataFields: nextProps.dataFields
    })
  },
  render: function () {

    var {selectedFields, dataFields} = this.props
    var {dataFields, listId} = this.props
    var that = this;
    var renderDataFields = function () {
      return dataFields.map((field) => {
        return (
          <div key={listId + dataFields.indexOf(field)} className="fieldName" id={listId + dataFields.indexOf(field)} 
          onClick={() => that.handleClick(field, dataFields.indexOf(field))}>{field}</div>
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
