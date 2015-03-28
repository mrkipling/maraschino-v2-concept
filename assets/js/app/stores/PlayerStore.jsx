var _ = require('underscore');
var qwest = require('qwest');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

var playerInfo = {};

var PlayerStore = Tools.Store.create({

    /**
     * Returns information about what is currently playing.
     * @param {boolean} refresh - Force XHR check for new items.
     */

    getPlayerInfo: function(refresh=false) {
        if (refresh) {
            PlayerActionCreators.fetchPlayerInfo();
        }

        return playerInfo;
    }

});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case "FETCH_PLAYER_INFO":
            qwest.get('/currently-playing/', null, { responseType: 'json' })
                 .then(function(response) {
                     playerInfo = response;
                     PlayerStore.emitChange();
                 });
            break;
    }
});

module.exports = PlayerStore;
