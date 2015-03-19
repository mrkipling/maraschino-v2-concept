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
                <li className="module-recent-episodes--list--item">
                    <p className="module-recent-episodes--list--show-title">{episode.showtitle}</p>
                    <p className="module-recent-episodes--list--episode-number">Season {episode.season}, Episode {episode.episode}</p>
                    <p className="module-recent-episodes--list--episode-title">{episode.title}</p>
                </li>
            );
        });

        return (
            <div className="module module-recent-episodes">
                <p className="module--title">Recent Episodes</p>
                <ul className="module-recent-episodes--list">
                    {episodes}
                </ul>
            </div>
        );
    }

});

module.exports = RecentEpisodes;
