var React = require('react');

var AppStore = require('./stores/AppStore');
var Column = require('./components/Column');
var StoreWatchMixin = require('./mixins/StoreWatchMixin');

var App = React.createClass({

    mixins: [StoreWatchMixin(AppStore)],

    getStateFromStore: function() {
        return AppStore.getSettings();
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
