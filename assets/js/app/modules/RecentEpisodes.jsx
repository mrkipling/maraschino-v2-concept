var React = require('react');

var RecentStore = require('../stores/RecentStore');

var RecentEpisodes = React.createClass({

    getStateFromStore: function() {
        return {
            episodes: RecentStore.getRecentEpisodes()
        };
    },

    onChange: function() {
        this.setState(this.getStateFromStore());
    },

    getInitialState: function() {
        return this.getStateFromStore();
    },

    componentDidMount: function() {
        RecentStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        RecentStore.removeChangeListener(this.onChange);
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
