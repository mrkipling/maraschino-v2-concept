var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');

var settings = {};

/**
 * Returns a setting value stored in a meta tag.
 * @param {string} setting - The setting to return the value of.
 * @param {string} type - How should the setting be parsed?
 */

function getMetaSetting(setting, type) {
    var val = document.querySelectorAll('meta[name=columns]')[0].getAttribute('content');

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

var AppStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

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
