var React = require('react/addons');
var _ = require('underscore');

var PlayerStore = require('../../stores/PlayerStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var AppActionCreators = require('../../actions/AppActionCreators');

var MediaInfo = require('./components/MediaInfo');
var ProgressBar = require('./components/ProgressBar');

/**
 * Currently playing bar.
 */

var CurrentlyPlaying = React.createClass({

    mixins: [StoreWatchMixin(PlayerStore)],

    getInitialStateFromStore: function() {
        return this.getStateFromStore(true);
    },

    getStateFromStore: function(refresh=false) {
        var player = PlayerStore.getPlayerInfo(refresh);
        var background = false;

        // if there is currently playing media with fanart, update the background
        if (player.media && typeof player.media.fanart !== 'undefined') {
            background = player.media.fanart;
        }

        AppActionCreators.updateSetting({
            background: background
        });

        return {
            player: player
        }
    },

    componentDidMount: function() {
        setInterval(PlayerStore.getPlayerInfo.bind(this, true), 5000);
    },

    render: function() {
        var player = this.state.player;
        var inner;

        if (_.isEmpty(player)) {
            return (
                <div className="currently-playing inactive" />
            );
        }

        var timeInfo = {
            current: player.time,
            total: player.totaltime,
            percentage: player.percentage
        };

        return (
            <div className="currently-playing">
                {player.media && <MediaInfo media={player.media} />}
                <ProgressBar timeInfo={timeInfo} />
            </div>
        );
    }

});

module.exports = CurrentlyPlaying;
