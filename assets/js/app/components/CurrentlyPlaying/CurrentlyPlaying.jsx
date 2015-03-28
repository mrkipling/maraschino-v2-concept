var React = require('react');
var _ = require('underscore');

var PlayerStore = require('../../stores/PlayerStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');

var MediaInfo = require('./components/MediaInfo');

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

        return _.isEmpty(player) ? null : (
            <div className="currently-playing">
                {player.media && <MediaInfo media={player.media} />}
            </div>
        );
    }

});

module.exports = CurrentlyPlaying;
