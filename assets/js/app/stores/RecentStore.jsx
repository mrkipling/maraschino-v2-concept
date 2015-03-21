var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var recentEpisodes = [];

/**
 * Private function to fetch recent episodes via XHR. If you want to force an
 * XHR check then use `RecentStore.getRecentEpisodes(true)`.
 */

function loadRecentEpisodes() {
    qwest.get('/module/recent/episodes/', null, { responseType: 'json' })
         .then(function(response) {
             recentEpisodes = response;
             Tools.setLocalStore('recentEpisodes', recentEpisodes);
             RecentStore.emitChange();
         });
}

var RecentStore = Tools.createStore({

    /**
     * Returns recently added episodes.
     * @param {boolean} refresh - Force XHR check for new items.
     */

    getRecentEpisodes: function(refresh=false) {
        // if the recentEpisodes array is empty or we're forcing a refresh
        if (_.isEmpty(recentEpisodes) || refresh) {
            // fetch from localStorage so that we can display information
            // immediately on page load
            recentEpisodes = Tools.getLocalStore('recentEpisodes');

            // XHR load recent episodes
            loadRecentEpisodes();
        }

        return recentEpisodes;
    }

});

module.exports = RecentStore;
