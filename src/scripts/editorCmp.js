var React = require('react');

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

exports.modules = modules;

function getCompontByType(type) {
    var Compont = PlainForm;
    switch (type) {
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
    return Compont;
}

exports.getCompontByType = getCompontByType;
