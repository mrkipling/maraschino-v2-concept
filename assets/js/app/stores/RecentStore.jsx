var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');

var recentEpisodes = [];

function getRecentEpisodes() {
    // TODO: XHR
    RecentStore.emitChange();
}

var RecentStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

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
