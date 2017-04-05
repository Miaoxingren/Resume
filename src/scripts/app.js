var React = require('react');
var ReactRedux = require('react-redux');
var Resume = require('./resume.js');
var Editor = require('./editor.js');

var App = React.createClass({
    render: function () {
        return (
            <div className="flex-container">
                <div><Resume /></div>
                <div><Editor /></div>
            </div>
        );
    }
});

module.exports = App;
