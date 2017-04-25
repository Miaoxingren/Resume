var React = require('react');
var ReactRedux = require('react-redux');
var Resume = require('./resume.js');
var reducer = require('./reducer.js');
var Componts = require('./editorCmp.js');


var PageManager = React.createClass({
    getInitialState: function() {
        return {column: 2};
    },
    changeColumn: function(event) {
        this.setState({column: event.target.value});
    },
    addPage: function(event) {
        this.props.addPage(this.state.column);
    },
    removePage: function(event) {
        this.props.removePage();
    },
    render: function () {
        return (
            <div className="page-manage">
                <p><label>Column</label></p>
                <p><input type="number" min="1" max="2" defaultValue="2" onChange={this.changeColumn}/></p>
                <p><button onClick={this.addPage}>add page</button></p>
                <hr />
                <p><button onClick={this.removePage}>remove last page</button></p>
            </div>
        );
    }
});

var ModuleManager = React.createClass({
    getInitialState: function() {
        return {page: 1, column: 1, module: 'brief', data: null};
    },
    changePage: function(event) {
        this.setState({page: event.target.value});
    },
    changeColumn: function(event) {
        this.setState({column: event.target.value});
    },
    changeModule: function(event) {
        this.setState({module: event.target.value});
    },
    addModule: function(event) {
        if (!this.state.data) {
            return;
        }
        var data = this.state.data;
        if (this.state.module === 'basic') {
            data = Object.keys(this.state.data).map(function (key) {
                return {icon: key, name: key, content: data[key]};
            });
        }
        this.props.addModule(this.state.page - 1, this.state.column - 1, this.state.module, data);
    },
    recieveData: function(data) {
        this.setState({data: data});
    },
    render: function () {
        return (
            <div className="module-manage">
                <p>
                    <select value={this.state.module} onChange={this.changeModule}>
                        {Componts.modules.map(function(module, i) {
                            return (
                                <option key={i} value={module.name}>{module.name}</option>
                            );
                        })}
                    </select>
                </p>
                {Componts.modules.map(function(module, i) {
                    var className = this.state.module === module.name ? 'shown' : 'hidden';
                    var Compont = Componts.getCompontByType(module.type);
                    return (
                        <div className={className} key={i}>
                            <Compont passData={this.recieveData} items={module.items}/>
                        </div>
                    );
                }.bind(this))}
                <hr />
                <p><label>Page</label></p>
                <p><input type="number" min="1" max={this.props.pageCnt} value={this.state.page} onChange={this.changePage}/></p>
                <p><label>Column</label></p>
                <p><input type="number" min="1" max={this.props.colOfPage[this.state.page - 1] || 1} value={this.state.column} onChange={this.changeColumn}/></p>
                <p><button onClick={this.addModule}>add module</button></p>
            </div>
        );
    }
});

var Editor = React.createClass({
    render: function() {
        return (
            <div className="editor">
                <div className="form-field">
                    <p className="title"><span>1</span>Page manage</p>
                    <div className="content"><PageManager addPage={this.props.addPage} removePage={this.props.removePage} /></div>
                </div>
                <div className="form-field">
                    <p className="title"><span>2</span>Module manage</p>
                    <div className="content">
                        <ModuleManager addModule={this.props.addModule} pageCnt={this.props.pageCnt} colOfPage={this.props.colOfPage}/>
                    </div>
                </div>
            </div>
        );
    }
});

var matchStateToProps = function(state, props) {
    var colOfPage = [];
    for (var i = 0; i < state.length; i++) {
        colOfPage.push(state[i].column.length);
    }
    return {
        pageCnt: state.length,
        colOfPage: colOfPage
    };
};

var matchDispathToProps = function(dispatch, props) {
    return {
        addPage: function(column) {
            dispatch(reducer.addPage(column));
        },
        removePage: function() {
            dispatch(reducer.removePage());
        },
        addModule: function(page, column, name, data) {
            dispatch(reducer.addModule(page, column, name, data));
        }
    };
};

module.exports = ReactRedux.connect(matchStateToProps, matchDispathToProps)(Editor);
