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
                                <label htmlFor={item}>{item}:</label>
                                <input name={item} type="text" onChange={this.changeData}/>
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
                <input type="text" onChange={this.changeData}/>
                <button onClick={this.addItem}>add Item</button>
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
                                <label htmlFor={item}>{item}:</label>
                                <input name={item} type="text" onChange={this.changeData}/>
                            </div>
                        );
                    }.bind(this))
                    : false}
                <button onClick={this.addItem}>add Item</button>
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
                <input type="text" onChange={this.changeData}/>
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
        item: ['name', 'job']
    }, {
        name: 'basic',
        type: OBJ,
        item: ['age', 'loc', 'phone', 'mail']
    }, {
        name: 'hobby',
        type: OBJARRAY,
        item: ['icon', 'content']
    }, {
        name: 'prize',
        type: ARRAY
    }, {
        name: 'certificate',
        type: ARRAY
    }, {
        name: 'skill',
        type: OBJARRAY,
        item: ['name', 'degree']
    }, {
        name: 'evaluation',
        type: PLAIN
    }, {
        name: 'education',
        type: OBJARRAY,
        item: ['name', 'headline', 'content']
    }, {
        name: 'practice',
        type: OBJARRAY,
        item: ['name', 'headline', 'content']
    }, {
        name: 'intern',
        type: OBJARRAY,
        item: ['name', 'headline', 'content']
    }, {
        name: 'repo',
        type: OBJARRAY,
        item: ['name', 'headline', 'content']
    }, {
        name: 'custom',
        type: OBJARRAY,
        item: ['name', 'headline', 'content']
    }
];

var Editor = React.createClass({
    getInitialState: function() {
        return {column: 2, moduleToAdd: 'brief', data: {}};
    },
    changeColumn: function(event) {
        this.setState({column: event.target.value});
    },
    changeModuleToAdd: function(event) {
        this.setState({moduleToAdd: event.target.value});
    },
    addPage: function(event) {
        this.props.addPage(this.state.column);
    },
    removePage: function(event) {
        this.props.removePage();
    },
    addModule: function(event) {
        this.props.addModule(this.state.moduleToAdd, this.state.data);
    },
    recieveData: function(data) {
        this.setState({data: data});
    },
    render: function() {
        return (
            <div>
                <label htmlFor="column">Column:</label>
                <input name="column" type="number" min="1" max="2" value={this.state.column} onChange={this.changeColumn}/>
                <button onClick={this.addPage}>add page</button>
                <br/>
                <button onClick={this.removePage}>remove last page</button>
                <br/>
                <select value={this.state.moduleToAdd} onChange={this.changeModuleToAdd}>
                    {modules.map(function(module, i) {
                        return (
                            <option key={i} value={module.name}>{module.name}</option>
                        );
                    })}
                </select>
                {modules.map(function(module, i) {
                    var className = this.state.moduleToAdd === module.name
                        ? 'shown'
                        : 'hidden';
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
                            <Compont passData={this.recieveData} items={module.item}/>
                        </div>
                    );
                }.bind(this))}
                <button onClick={this.addModule}>add module</button>
            </div>
        );
    }
});

var matchStateToProps = function(state, props) {
    return {};
};

var matchDispathToProps = function(dispatch, props) {
    return {
        addPage: function(column) {
            dispatch(reducer.addPage(column));
        },
        removePage: function() {
            dispatch(reducer.removePage());
        },
        addModule: function(name, data) {
            dispatch(reducer.addModule(0, 0, name, data));
        }
    };
};

module.exports = ReactRedux.connect(matchStateToProps, matchDispathToProps)(Editor);
