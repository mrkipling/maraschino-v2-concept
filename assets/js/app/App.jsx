var React = require('react');

var AppStore = require('./stores/AppStore');
var Column = require('./components/Column');

var App = React.createClass({

    getStateFromStore: function() {
        return AppStore.getSettings();
    },

    onChange: function() {
        this.setState(this.getStateFromStore());
    },

    getInitialState: function() {
        return this.getStateFromStore();
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onChange);
    },

    render: function() {
        var columns = this.state.columns;
        var eleColumns = columns.map(function(column, index) {
            return (
                <Column key={'column-' + index} moduleNames={column} />
            );
        });

        return (
            <div className={'columns-' + columns.length}>
                {eleColumns}
            </div>
        );
    }

});

React.render(<App />, document.getElementById('app'));
