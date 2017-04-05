var React = require('react');
var Componts = require('./components.js');
var ReactRedux = require('react-redux');
var Column = React.createClass({
    render: function() {
        return (
            <div className="column">
                {this.props.module.map(function(module, i) {
                    var Compont = Componts.getCompontByName(module.name);
                    return (
                        <Compont key={i} name={module.name} icon={module.icon} data={module.data} />
                    );
                }.bind(this))}
            </div>
        );
    }
});

var Page = React.createClass({
    render: function () {
        return (
            <div className="page-a4">
                <div className="content-wrapper">
                    <div className="flex-container">
                        {this.props.column.map(function(column, i) {
                            return (
                                <Column key={i} module={column.module} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

var Resume = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.data ? this.props.data.map(function(page, i) {
                    return (
                        <Page key={i} column={page.column} />
                    );
                }) : false}
            </div>
        );
    }
});


var matchStateToProps = function(state, props) {
    return {
        data: state
    };
};

module.exports = ReactRedux.connect(matchStateToProps)(Resume);
