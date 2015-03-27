var React = require('react');

var RecentMovie = React.createClass({

    propTypes: {
        movie: React.PropTypes.object
    },

    render: function() {
        var movie = this.props.movie;

        return (
            <div className="module-recent--list--item">
                <p className="module-recent--list--title">{movie.title}</p>
                <p>{movie.tagline}</p>
                <p>{movie.year}</p>
            </div>
        );
    }

});

module.exports = RecentMovie;
