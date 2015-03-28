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

    componentDidUpdate: function() {
        // if there is no background, reset it to the default

        if (!this.state.background) {
            document.body.style.backgroundImage = '';
            return;
        }

        // otherwise set the background image

        var url = this.state.background.replace('image://', '');
        if (url.slice(-1) === '/') {
            url = url.slice(0, -1);
        }

        url = `${this.state.serverUrl}image/${url}`;
        document.body.style.backgroundImage = `url(${url})`;
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
