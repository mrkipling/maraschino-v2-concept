var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var playerInfo = {};

/**
 * Private function to load information about what is currently playing via XHR.
 */

function loadInfo() {
    qwest.get('/currently-playing/', null, { responseType: 'json' })
         .then(function(response) {
             playerInfo = response;
             PlayerStore.emitChange();
         });
}

var PlayerStore = Tools.Store.create({

    /**
     * Returns information about what is currently playing.
     * @param {boolean} refresh - Force XHR check for new items.
     */

    getPlayerInfo: function(refresh=false) {
        if (refresh) {
            loadInfo();
        }

        return playerInfo;
    }

});

module.exports = PlayerStore;
