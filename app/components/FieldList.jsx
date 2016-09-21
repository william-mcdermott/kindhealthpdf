var React = require('react');
var $ = require('jquery');
var classNames = require('classnames')

var FieldList = React.createClass({
  getInitialState: function () {
    return {
      jsxReturn: [],
      dataFields: [],
      dataFieldArray: []
    }
  },
  handleClick: function (newField, index) {
    this.props.onToggleField(newField)
    // var fieldClass = classNames({
    //   'disabled': selectedFields.indexOf(newField) != -1,
    //   'fieldName': true
    // })
    $('#' + index).toggleClass('disabled');
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      dataFields: nextProps.dataFields
    })
    console.log(this.props);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    $('.disabled').toggleClass('disabled');
    var {dataFields} = this.state;
    this.props.onSubmit();

  },
  render: function () {

    var {selectedFields, dataFields} = this.props
    var {dataFields} = this.props
    console.log(this.props);
    var that = this;
    var renderDataFields = function () {
      console.log(dataFields);
      return dataFields.map((field) => {
        return (
          <div key={dataFields.indexOf(field)} className="fieldName" id={dataFields.indexOf(field)} onClick={() => that.handleClick(field, dataFields.indexOf(field))}>{field}</div>
          // <div key={dataFields.indexOf(field)} className="fieldName">{field}</div>
        )
      });
    };
    return (
      <div className="fieldList" onSubmit={this.handleSubmit}>
        <form>
          <input type="submit" className="button" value="Submit Fields" />
          {renderDataFields()}
        </form>
      </div>
    )
  }
})

module.exports = FieldList;
