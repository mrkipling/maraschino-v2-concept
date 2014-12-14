/** @jsx React.DOM */

/**
 * The container that renders the columns and modules.
 */

Maraschino.Container.Base = React.createClass({
    getInitialState: function() {
        var columns = Maraschino.Tools.getSetting('columns', 'json');
        var num_columns = Math.min(columns.length, Maraschino.Tools.getSetting('num_columns', 'int'));
        columns = columns.slice(0, num_columns);

        return {
            columns: columns
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
