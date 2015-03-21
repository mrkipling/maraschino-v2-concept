var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var recentEpisodes = [];

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
        if (_.isEmpty(recentEpisodes) || refresh) {
            recentEpisodes = Tools.getLocalStore('recentEpisodes');
            loadRecentEpisodes();
        }

        return recentEpisodes;
    }

});

module.exports = RecentStore;
