var React = require('react');

var Title = React.createClass({
    render: function() {
        var icon = this.props.icon ? 'icon-' + this.props.icon : 'icon-list';
        return (
            <div className="group-title">
                <div className="icon">
                    <span className={icon}></span>
                </div>
                <div className="name">
                    <span>{this.props.name}</span>
                    <div className="arrow"></div>
                </div>
            </div>
        );
    }
});

var Group = React.createClass({
    render: function() {
        return (
            <div className="group">
                <Title name={this.props.name} icon={this.props.icon}/>
                <div>{this.props.children}</div>
            </div>
        );
    }
});

var Basic = React.createClass({
    render: function() {
        return (
            <Group name="基本资料" icon="profile">
                <ul className="basic">
                    {this.props.data
                        ? this.props.data.map(function(item, i) {
                            return (
                                <li key={i}>
                                    {item.icon
                                        ? <span className={'icon-' + item.icon}></span>
                                        : <span>{item.name}</span>}
                                    <span>{item.content}</span>
                                </li>
                            );
                        })
                        : false}
                </ul>
            </Group>
        );
    }
});

var Hobby = React.createClass({
    render: function() {
        return (
            <Group name="兴趣爱好" icon="hobby">
                <ul className="hobby">
                    {this.props.data
                        ? this.props.data.map(function(item, i) {
                            return (
                                <li key={i}>
                                    {item.icon
                                        ? <span className={'icon-' + item.icon}></span>
                                        : false}
                                    <p>{item.content}</p>
                                </li>
                            );
                        })
                        : false}
                </ul>
            </Group>
        );
    }
});

var Prize = React.createClass({
    render: function() {
        return (
            <Group name="奖项荣誉" icon="prize">
                <ul className="prize">
                    {this.props.data.map(function(item, i) {
                        return (
                            <li key={i}>{item}</li>
                        );
                    })}
                </ul>
            </Group>
        );
    }
});

var Certificate = React.createClass({
    render: function() {
        return (
            <Group name="技能证书" icon="certificate">
                <ul className="certificate">
                    {this.props.data.map(function(item, i) {
                        return (
                            <li key={i}>{item}</li>
                        );
                    })}
                </ul>
            </Group>
        );
    }
});

var Skill = React.createClass({
    render: function() {
        return (
            <Group name="个人技能" icon="skill">
                <ul className="skill">
                    {this.props.data.map(function(item, i) {
                        var degree = item.degree ? <span style={{width: item.degree}} className="degree"></span> : false;
                        return (
                            <li key={i}>{degree}{item.name}</li>
                        );
                    })}
                </ul>
            </Group>
        );
    }
});

var Evaluation = React.createClass({
    render: function() {
        return (
            <Group name="自我评价" icon="evaluation">
                <p>{this.props.data}</p>
            </Group>
        );
    }
});

var Brief = React.createClass({
    render: function() {
        var data = this.props.data;
        return (
            <div className="brief">
                {data.photo
                    ? (<img src={data.photo} alt="photo"/>)
                    : false}
                <p className="name">{data.name}</p>
                <p className="job">求职目标：{data.job}</p>
            </div>
        );
    }
});

var TimeLine = React.createClass({
    render: function() {
        return (
            <div className="timeline">
                {this.props.points.map(function(item, i) {
                    return (
                        <div className="item" key={i}>
                            <div className="title">
                                <span className="line-dot"></span>
                                <span>{item.name}</span>
                                <p>{item.headline}</p>
                            </div>
                            {item.content ? <div className="content">{item.content}</div> : false}
                        </div>
                    );
                })}

            </div>
        );
    }
});

var Education = React.createClass({
    render: function() {
        return (
            <Group name="教育背景" icon="education">
                <TimeLine points={this.props.data}/>
            </Group>
        );
    }
});

var Practice = React.createClass({
    render: function() {
        return (
            <Group name="校内实践" icon="practice">
                <TimeLine points={this.props.data}/>
            </Group>
        );
    }
});

var Intern = React.createClass({
    render: function() {
        return (
            <Group name="实习经历" icon="intern">
                <TimeLine points={this.props.data}/>
            </Group>
        );
    }
});

var Repo = React.createClass({
    render: function() {
        return (
            <Group name="项目经历" icon="repo">
                <TimeLine points={this.props.data}/>
            </Group>
        );
    }
});

var Custom = React.createClass({
    render: function() {
        return (
            <Group name={this.props.name} icon={this.props.icon}>
                <TimeLine points={this.props.data}/>
            </Group>
        );
    }
});

var componts = {
    'basic': Basic,
    'hobby': Hobby,
    'prize': Prize,
    'certificate': Certificate,
    'skill': Skill,
    'evaluation': Evaluation,
    'brief': Brief,
    'education': Education,
    'practice': Practice,
    'intern': Intern,
    'repo': Repo
};

var getCompontByName = function (name) {
    return componts[name] || Custom;
};

exports.getCompontByName = getCompontByName;
