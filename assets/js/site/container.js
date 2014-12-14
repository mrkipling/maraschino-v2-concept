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

    componentDidMount: function() {
        // set the number of columns in the grid, for the benefit of the CSS
        document.getElementById('container').classList.add('columns-' + this.state.columns.length);
    },

    render: function() {
        var columns = this.state.columns.map(function(column) {
            return (
                <Maraschino.Container.Column modules={column} />
            );
        });

        return (
            <div className="row">
                {columns}
            </div>
        );
    }
});

Maraschino.Container.Column = React.createClass({
    render: function() {
        var modules = this.props.modules.length === 0 ? (
            <span>&nbsp;</span>
        ) : this.props.modules.map(function(module) {
            return (
                <Maraschino.Container.Module module={module} />
            );
        });

        return (
            <div className="column">
                {modules}
            </div>
        );
    }
});

Maraschino.Container.Module = React.createClass({
    render: function() {
        var module = this.props.module;
        return (
            <div className="module">
                <p>Module: {module}</p>
            </div>
        );
    }
});
