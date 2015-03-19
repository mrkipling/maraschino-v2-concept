var React = require('react');

var RecentStore = require('../stores/RecentStore');
var StoreWatchMixin = require('../mixins/StoreWatchMixin');

var RecentEpisodes = React.createClass({

    mixins: [StoreWatchMixin(RecentStore)],

    getStateFromStore: function() {
        return {
            episodes: RecentStore.getRecentEpisodes()
        };
    },

    render: function() {
        var episodes = this.state.episodes.map(function(episode) {
            return (
                <li>
                    <strong>{episode.showtitle}</strong><br />
                    {episode.label}
                </li>
            );
        });

        return (
            <div className="module">
                <p>Recent Episodes</p>
                <ul>
                    {episodes}
                </ul>
            </div>
        );
    }

});

module.exports = RecentEpisodes;
