var React = require('react/addons');

/**
 * Render a recent episode.
 */

var RecentEpisode = React.createClass({

    propTypes: {
        episode: React.PropTypes.object
    },

    render: function() {
        var episode = this.props.episode;

        return (
            <div className="module-recent--list--item">
                <p className="module-recent--list--title">{episode.showtitle}</p>
                <p>Season {episode.season}, Episode {episode.episode}</p>
                <p>{episode.title}</p>
            </div>
        );
    }

});

module.exports = RecentEpisode;
