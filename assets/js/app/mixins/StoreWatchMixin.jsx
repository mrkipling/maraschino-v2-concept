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
