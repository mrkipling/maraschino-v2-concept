/** @jsx React.DOM */

/**
 * @fileOverview Base JS file.
 */

var Maraschino = {
    Tools: {},
    Modules: {}
};

/** @jsx React.DOM */

/**
 * @fileOverview Toolbox / helper functions.
 */

/** @jsx React.DOM */

/**
 * The container that renders the columns and modules.
 */

Maraschino.Container = React.createClass({displayName: 'Container',
    render: function() {
        return (
            React.createElement("div", {className: "row"}
            )
        );
    }
});

/** @jsx React.DOM */

/**
 * @fileOverview Render the page.
 */

React.renderComponent(
    React.createElement(Maraschino.Container, null),
    document.getElementById('container')
);
