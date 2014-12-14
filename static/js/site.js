/** @jsx React.DOM */

/**
 * @fileOverview Base JS file.
 */

var Maraschino = {
    Modules: {},
    Settings: {},
    Tools: {}
};

Maraschino.init = function () {

    // populate settings

    Maraschino.Settings.columns = Maraschino.Tools.getSetting('columns', 'json');
    Maraschino.Settings.num_columns = Maraschino.Tools.getSetting('num_columns', 'int');

};

/** @jsx React.DOM */

/**
 * @fileOverview Toolbox / helper functions.
 */

/**
 * Returns a setting value stored in a meta tag.
 * @param {string} setting - The setting to return the value of.
 */

Maraschino.Tools.getSetting = function (setting, type) {
    var val = document.querySelectorAll('meta[name=' + setting + ']')[0].getAttribute('content');

    switch (type) {
        case 'json':
        // return JSON (have to replace single quotes with double quotes for
        // the parser to recognise it as valid JSON)
        return JSON.parse(val.replace(/'/g, '\"'));

        case 'int':
        return parseInt(val);

        default:
        // return a string
        return val;
    }
};

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

// Defined in base.js.
Maraschino.init();

React.renderComponent(
    React.createElement(Maraschino.Container, null),
    document.getElementById('container')
);
