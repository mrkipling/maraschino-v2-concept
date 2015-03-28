var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {

    fetchPlayerInfo: function() {
        var action = {
            actionType: "FETCH_PLAYER_INFO"
        };
        Dispatcher.dispatch(action);
    }

};
