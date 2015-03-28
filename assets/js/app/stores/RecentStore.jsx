var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');
var RecentActionCreators = require('../actions/RecentActionCreators');

var recent = {
    episodes: [],
    movies: []
};

var RecentStore = Tools.Store.create({

    /**
     * Returns recently added episodes or movies.
     * @param {boolean} refresh - Force XHR check for new items.
     */

    getRecent: function(type='episodes', refresh=false) {
        // if the array is empty or we're forcing a refresh
        if (_.isEmpty(recent[type]) || refresh) {

            // fetch from localStorage so that we can display information
            // immediately on page load
            if (_.isEmpty(recent[type])) {
                recent[type] = Tools.LocalStorage.getItem(`recent:${type}`) || [];
            }

            // XHR load recent media
            switch (type) {
                case 'episodes':
                    RecentActionCreators.fetchRecentEpisodes();
                    break;

                case 'movies':
                    RecentActionCreators.fetchRecentMovies();
                    break;
            }
        }

        return recent[type];
    }

});

Dispatcher.register(function(action) {
    var type;

    switch(action.actionType) {
        case "FETCH_RECENT_EPISODES":
        case "FETCH_RECENT_MOVIES":
            type = (action.actionType === 'FETCH_RECENT_EPISODES') ? 'episodes' : 'movies';
            qwest.get(`/module/recent/${type}/`, null, { responseType: 'json' })
                 .then(function(response) {
                     recent[type] = response;
                     Tools.LocalStorage.setItem(`recent:${type}`, recent[type]);
                     RecentStore.emitChange();
                 });
            break;
    }
});

module.exports = RecentStore;
