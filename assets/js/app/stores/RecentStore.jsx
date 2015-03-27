var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var recent = {
    episodes: [],
    movies: []
};

/**
 * Private function to fetch recent episodes or movies via XHR. If you want to
 * force an XHR check then use `RecentStore.getRecentEpisodes(true)`.
 */

function loadRecent(type='episodes') {
    qwest.get(`/module/recent/${type}/`, null, { responseType: 'json' })
         .then(function(response) {
             recent[type] = response;
             Tools.LocalStorage.setItem(`recent:${type}`, recent[type]);
             RecentStore.emitChange();
         });
}

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

            // XHR load recent episodes
            loadRecent(type);
        }

        return recent[type];
    }

});

module.exports = RecentStore;
