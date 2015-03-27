/**
 * Mixin to watch a store. Gets the initial state, adds a change listener,
 * and removes the listener when unmounting. All you need to specify is how
 * to update the state by adding `getStateFromStore`.
 */

var StoreWatchMixin = function(store) {
    return {
        onChange: function() {
            this.setState(this.getStateFromStore());
        },

        getInitialState: function() {
            return this.getStateFromStore();
        },

        componentDidMount: function() {
            store.addChangeListener(this.onChange);
        },

        componentWillUnmount: function() {
            store.removeChangeListener(this.onChange);
        }
    };
};

module.exports = StoreWatchMixin;
