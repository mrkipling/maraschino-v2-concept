var React = require('react/addons');

var AppStore = require('./stores/AppStore');
var StoreWatchMixin = require('./mixins/StoreWatchMixin');

var Column = require('./components/Column');
var CurrentlyPlaying = require('./components/CurrentlyPlaying/CurrentlyPlaying');

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
            <div className="container">
                <div className={'columns-' + columns.length}>
                    {eleColumns}
                </div>
                <CurrentlyPlaying />
            </div>
        );
    }

});

React.render(<App />, document.getElementById('app'));
