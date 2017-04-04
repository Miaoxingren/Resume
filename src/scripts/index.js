var React = require('react');
var ReactDOM = require('react-dom');

var Resume = require('./resume.js');
var data = require('./pages.json');
ReactDOM.render((<Resume data={data}/>), document.getElementById('resume'));
