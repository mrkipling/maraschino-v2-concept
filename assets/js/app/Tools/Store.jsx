var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ToolsStore = {};

/**
 * Create a basic store.
 * @param {object} methods - Methods to add to the store. Overwrites defaults.
 */

ToolsStore.create = function(methods) {
    var defaultMethods = {
        emitChange: function() {
            this.emit('change');
        },

        addChangeListener: function(callback) {
            this.on('change', callback);
        },

        removeChangeListener: function(callback) {
            this.removeListener('change', callback);
        }
    };

    return assign({}, EventEmitter.prototype, _.extend(defaultMethods, methods));
};

module.exports = ToolsStore;
