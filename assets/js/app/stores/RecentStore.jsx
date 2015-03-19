var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var recentEpisodes = [];

function loadRecentEpisodes() {
    qwest.get('/module/recent/episodes/', null, { responseType: 'json' })
         .then(function(response) {
             recentEpisodes = response;
             RecentStore.emitChange();
         });
}

var RecentStore = Tools.createStore({

    /**
     * Returns recently added episodes.
     * @param {boolean} refresh - Force XHR check for new items.
     */

    getRecentEpisodes: function(refresh) {
        if (typeof refresh === 'undefined') {
            refresh = false;
        }

        if (_.isEmpty(recentEpisodes) || refresh) {
            loadRecentEpisodes();
        }

        return recentEpisodes;
    }

});

module.exports = RecentStore;
