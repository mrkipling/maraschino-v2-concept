var _ = require('underscore');

var Tools = require('../Tools');
var Dispatcher = require('../dispatcher/Dispatcher');

var settings = {};

/**
 * Returns a setting value stored in a meta tag.
 * @param {string} setting - The setting to return the value of.
 * @param {string} type - How should the setting be parsed?
 */

function getMetaSetting(setting, type) {
    var val = document.querySelectorAll('meta[name=' + setting +']')[0].getAttribute('content');

    switch (type) {
        case 'json':
        // return JSON (have to replace single quotes with double quotes for
        // the parser to recognise it as valid JSON)
        return JSON.parse(val.replace(/'/g, '\"'));

        case 'int':
        // returns an int
        return parseInt(val);

        default:
        // return a string
        return val;
    }
};

/**
 * Read the initial settings from the DOM.
 */

function initialiseSettings() {
    settings.columns = getMetaSetting('columns', 'json');
}

/**
 * App Store.
 */

var AppStore = Tools.createStore({

    getSettings: function() {
        if (_.isEmpty(settings)) {
            initialiseSettings();
        }

        return settings;
    }

});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case "UPDATE_SETTING":
            var key = Object.keys(action.setting)[0];
            var setting = settings[key];
            if (setting) {
                settings[key] = action.setting[key];
                AppStore.emitChange();
            }
            break;
    }
});

module.exports = AppStore;
