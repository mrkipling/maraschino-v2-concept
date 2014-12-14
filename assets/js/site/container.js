/** @jsx React.DOM */

/**
 * The container that renders the columns and modules.
 */

Maraschino.Container.Base = React.createClass({
    getInitialState: function() {
        var columns = Maraschino.Tools.getSetting('columns', 'json');
        return {
            columns: columns,
            num_columns: Math.min(columns.length, Maraschino.Tools.getSetting('num_columns', 'int'))
        };
    },

    render: function() {
        return (
            <div className="row">
            </div>
        );
    }
});

Maraschino.Container.Column = React.createClass({
    render: function () {
        return null;
    }
});
