var React = require('react');
var $ = require('jquery');
var classNames = require('classnames')

var FieldList = React.createClass({
  setInitialState: function () {
    return {}
  },
  handleClick: function (newField) {
    this.props.onAddField(newField)
    $('#' + newField).toggleClass('disabled');
  },
  render: function () {
    var {selectedFields} = this.props
    var fieldClass = classNames({
      'disabled': selectedFields.indexOf(this) !== -1,
      'fieldName': true
    })
    return (
      <div className="fieldList">
        <div className={fieldClass} id="Name" onClick={() => this.handleClick('Name')}>Name</div>
        <div className={fieldClass} id="Address" onClick={() => this.handleClick('Address')}>Address</div>
      </div>
    )
  }
})

module.exports = FieldList;
