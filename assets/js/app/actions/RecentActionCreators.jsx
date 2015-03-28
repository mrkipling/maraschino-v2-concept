var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {

    fetchRecentEpisodes: function() {
        var action = {
            actionType: "FETCH_RECENT_EPISODES"
        };
        Dispatcher.dispatch(action);
    },

    fetchRecentMovies: function() {
        var action = {
            actionType: "FETCH_RECENT_MOVIES"
        };
        Dispatcher.dispatch(action);
    }

};
