var React = require('react');

var RecentStore = require('../stores/RecentStore');
var StoreWatchMixin = require('../mixins/StoreWatchMixin');

var Paginator = require('../components/Paginator');
var RecentEpisode = require('../components/RecentEpisode');

var RecentEpisodes = React.createClass({

    mixins: [StoreWatchMixin(RecentStore)],

    getStateFromStore: function() {
        return {
            episodes: RecentStore.getRecentEpisodes()
        };
    },

    render: function() {
        var renderEpisode = function(episode) {
            return (
                <RecentEpisode episode={episode} />
            );
        }

        return (
            <div className="module module-recent-episodes">
                <p className="module--title">Recent Episodes</p>
                <div className="module-recent-episodes--list">
                    <Paginator items={this.state.episodes} renderItem={renderEpisode} />
                </div>
            </div>
        );
    }

});

module.exports = RecentEpisodes;
