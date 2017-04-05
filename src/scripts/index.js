var React = require('react');

var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var App = require('./app.js');
var reducer = require('./reducer.js');

var store = Redux.createStore(reducer.reducer);

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('app'));
