var React = require('react');
var _ = require('underscore');

var PlayerStore = require('../../stores/PlayerStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

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
        return {
            player: PlayerStore.getPlayerInfo(refresh)
        }
    },

    render: function() {
        var player = this.state.player;

        if (_.isEmpty(player)) {
            return null;
        }

        var timeInfo = {
            time: player.time,
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
