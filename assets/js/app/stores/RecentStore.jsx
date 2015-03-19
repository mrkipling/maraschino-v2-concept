var _ = require('underscore');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var recentEpisodes = [];

function getRecentEpisodes() {
    // TODO: XHR
    RecentStore.emitChange();
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
            getRecentEpisodes();
        }

        return recentEpisodes;
    }

});

module.exports = RecentStore;
