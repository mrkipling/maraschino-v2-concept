var React = require('react');

var RecentStore = require('../stores/RecentStore');
var StoreWatchMixin = require('../mixins/StoreWatchMixin');

var Paginator = require('../components/Paginator');
var RecentEpisode = require('../components/RecentEpisode');
var RecentMovie = require('../components/RecentMovie');

var RecentMedia = React.createClass({

    mixins: [StoreWatchMixin(RecentStore)],

    getStateFromStore: function() {
        return {
            media: RecentStore.getRecent(this.props.type)
        };
    },

    render: function() {
        var type = this.props.type;
        var renderItem = this.props.renderItem;

        return (
            <div className="module module-recent">
                <p className="module--title">Recent {type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <div className="module-recent--list">
                    <Paginator items={this.state.media} renderItem={renderItem} />
                </div>
            </div>
        );
    }
});

var RecentEpisodes = React.createClass({

    render: function() {
        var renderEpisode = function(episode) {
            return (
                <RecentEpisode episode={episode} />
            );
        }

        return (
            <RecentMedia type={'episodes'} renderItem={renderEpisode} />
        );
    }

});

var RecentMovies = React.createClass({

    render: function() {
        var renderMovie = function(movie) {
            return (
                <RecentMovie movie={movie} />
            );
        }

        return (
            <RecentMedia type={'movies'} renderItem={renderMovie} />
        );
    }

});

module.exports = {
    RecentEpisodes: RecentEpisodes,
    RecentMovies: RecentMovies
};
