var React = require('react');

var RecentEpisode = React.createClass({

    propTypes: {
        episode: React.PropTypes.object
    },

    render: function() {
        var episode = this.props.episode;

        return (
            <div className="module-recent-episodes--list--item">
                <p className="module-recent-episodes--list--show-title">{episode.showtitle}</p>
                <p className="module-recent-episodes--list--episode-number">Season {episode.season}, Episode {episode.episode}</p>
                <p className="module-recent-episodes--list--episode-title">{episode.title}</p>
            </div>
        );
    }

});

module.exports = RecentEpisode;
