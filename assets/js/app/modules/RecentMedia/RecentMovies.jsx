var React = require('react/addons');
var RecentMedia = require('./components/RecentMedia');
var RecentMovie = require('./components/RecentMovie');

/**
 * Module: Recent Movies.
 */

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

module.exports = RecentMovies;
