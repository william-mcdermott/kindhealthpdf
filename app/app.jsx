var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var PdfMapper = require('PdfMapper');


//Load foundations
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <PdfMapper/>,
  document.getElementById('app')
);
