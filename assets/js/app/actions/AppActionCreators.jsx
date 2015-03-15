var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {

    updateSetting: function(setting) {
        var action = {
            actionType: "UPDATE_SETTING",
            setting: setting
        };

        Dispatcher.dispatch(action);
    }

};
