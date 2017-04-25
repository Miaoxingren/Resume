var React = require('react');
var ReactDOM = require('react-dom');

var Redux = require('redux');
var ReactRedux = require('react-redux');

var Resume = require('./resume.js');
var Editor = require('./editor.js');
var reducer = require('./reducer.js');

var App = React.createClass({
    render: function () {
        return (
            <div className="flex-container">
                <div><Editor /></div>
                <div><Resume /></div>
            </div>
        );
    }
});

var Provider = ReactRedux.Provider;
var store = Redux.createStore(reducer.reducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
