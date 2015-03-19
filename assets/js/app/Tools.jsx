var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Tools = {};

/**
 * Wrapper for console.log.
 * @param {string} message - The message to log to the console.
 * @param {string} type - Log type. Defaults to 'log'. See code for accepted values.
 */

Tools.log = function(message, type) {
    type = type || 'log';
    switch (type) {
    case 'warn':
        console.warn(message); break;
    case 'error':
        console.error(message); break;
    case 'info':
        console.info(message); break;
    case 'group':
        console.group(message); break;
    case 'groupCollapsed':
        console.groupCollapsed(message); break;
    case 'groupEnd':
        // ignore value of message
        console.groupEnd(); break;
    default:
        console.log(message);
    }
};

/**
 * Create a basic store.
 * @param {object} methods - Methods to add to the store. Overwrites defaults.
 */

Tools.createStore = function(methods) {
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

module.exports = Tools;
