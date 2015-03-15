var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');

var settings = {};

function initialiseSettings() {
    settings = {
        lol: true
    };
}

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
