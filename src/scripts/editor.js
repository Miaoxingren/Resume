var React = require('react');
var ReactRedux = require('react-redux');
var Resume = require('./resume.js');
var reducer = require('./reducer.js');

var ObjectForm = React.createClass({
    getInitialState: function() {
        return {data: {}};
    },
    changeData: function(event) {
        var data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({data: data});
        this.props.passData(this.state.data);
    },
    render: function() {
        return (
            <div>
                {this.props.items
                    ? this.props.items.map(function(item, i) {
                        return (
                            <div key={i}>
                                <p><label>{item}</label></p>
                                <p><input name={item} type="text" onChange={this.changeData}/></p>
                            </div>
                        );
                    }.bind(this))
                : false}
            </div>
        );
    }
});

var ArrayForm = React.createClass({
    getInitialState: function() {
        return {item: '', data: []};
    },
    changeData: function(event) {
        this.setState({item: event.target.value});
    },
    addItem: function() {
        var data = this.state.data;
        data.push(this.state.item);
        this.setState({data: data});
        this.props.passData(this.state.data);
    },
    render: function() {
        return (
            <div>
                <div>
                    {this.state.data
                        ? this.state.data.map(function(item, i) {
                            return (
                                <p key={i}>{item}</p>
                            );
                        }.bind(this))
                    : false}
                </div>
                <p><input type="text" onChange={this.changeData}/></p>
                <p><button onClick={this.addItem}>add Item</button></p>
            </div>
        );
    }
});

var ObjArrayForm = React.createClass({
    getInitialState: function() {
        return {item: {}, data: []};
    },
    changeData: function(event) {
        var item = this.state.item;
        item[event.target.name] = event.target.value;
        this.setState({item: item});
    },
    addItem: function() {
        var data = this.state.data;
        data.push(copyItem(this.state.item));
        this.setState({data: data});
        this.props.passData(this.state.data);
        function copyItem(item) {
            var res = {};
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    res[key] = item[key];
                }
            }
            return res;
        }
    },
    render: function() {
        return (
            <div>
                <div>
                    {this.state.data
                        ? this.state.data.map(function(item, i) {
                            return (
                                <div key={i}>
                                    {this.props.items
                                        ? this.props.items.map(function(key, i) {
                                            return (
                                                <p key={i}>{key}:{item[key]}</p>
                                            );
                                        })
                                    : false}
                                </div>
                            );
                        }.bind(this))
                    : false}
                </div>
                {this.props.items
                    ? this.props.items.map(function(item, i) {
                        return (
                            <div key={i}>
                                <p><label>{item}</label></p>
                                <p><input name={item} type="text" onChange={this.changeData}/></p>
                            </div>
                        );
                    }.bind(this))
                : false}
                <p><button onClick={this.addItem}>add Item</button></p>
            </div>
        );
    }
});

var PlainForm = React.createClass({
    getInitialState: function() {
        return {data: ''};
    },
    changeData: function(event) {
        this.setState({data: event.target.value});
        this.props.passData(this.state.data);
    },
    render: function() {
        return (
            <div>
                <p><input type="text" onChange={this.changeData}/></p>
            </div>
        );
    }
});

var OBJ = 1;
var OBJARRAY = 2;
var ARRAY = 3;
var PLAIN = 4;

var modules = [
    {
        name: 'brief',
        type: OBJ,
        items: ['name', 'job']
    }, {
        name: 'basic',
        type: OBJ,
        items: ['age', 'loc', 'phone', 'mail']
    }, {
        name: 'hobby',
        type: OBJARRAY,
        items: ['icon', 'content']
    }, {
        name: 'prize',
        type: ARRAY
    }, {
        name: 'certificate',
        type: ARRAY
    }, {
        name: 'skill',
        type: OBJARRAY,
        items: ['name', 'degree']
    }, {
        name: 'evaluation',
        type: PLAIN
    }, {
        name: 'education',
        type: OBJARRAY,
        items: ['name', 'headline', 'content']
    }, {
        name: 'practice',
        type: OBJARRAY,
        items: ['name', 'headline', 'content']
    }, {
        name: 'intern',
        type: OBJARRAY,
        items: ['name', 'headline', 'content']
    }, {
        name: 'repo',
        type: OBJARRAY,
        items: ['name', 'headline', 'content']
    }, {
        name: 'custom',
        type: OBJARRAY,
        items: ['name', 'headline', 'content']
    }
];

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
        return {page: 1, column: 2, module: 'brief', data: null};
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
            var res = [];
            Object.keys(this.state.data).map(function (key) {
                res.push({icon: key, name: key, content: data[key]});
            })
            data = res;
        }
        this.props.addModule(this.state.page - 1, this.state.column, this.state.module, data);
    },
    recieveData: function(data) {
        console.log(data);
        this.setState({data: data});
    },
    render: function () {
        return (
            <div className="module-manage">
                <p>
                    <select value={this.state.module} onChange={this.changeModule}>
                        {modules.map(function(module, i) {
                            return (
                                <option key={i} value={module.name}>{module.name}</option>
                            );
                        })}
                    </select>
                </p>
                {modules.map(function(module, i) {
                    var className = this.state.module === module.name ? 'shown' : 'hidden';
                    var Compont = PlainForm;
                    switch (module.type) {
                        case OBJ:
                            Compont = ObjectForm;
                            break;
                        case ARRAY:
                            Compont = ArrayForm;
                            break;
                        case OBJARRAY:
                            Compont = ObjArrayForm;
                            break;
                        default:
                            Compont = PlainForm;
                    }
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
                <p><input type="number" min="1" max={this.props.colOfPage[this.state.page - 1] || 1} defaultValue="1" onChange={this.changeColumn}/></p>
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
