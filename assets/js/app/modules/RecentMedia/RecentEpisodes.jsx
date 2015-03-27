var React = require('react');
var RecentMedia = require('./components/RecentMedia');
var RecentEpisode = require('./components/RecentEpisode');

/**
 * Module: Recent Episodes.
 */

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

module.exports = RecentEpisodes;
