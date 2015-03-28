var React = require('react/addons');

var Modules = {
    RecentEpisodes: require('../modules/RecentMedia/RecentEpisodes'),
    RecentMovies: require('../modules/RecentMedia/RecentMovies')
};

/**
 * Render a column containing modules.
 */

var Column = React.createClass({

    propTypes: {
        moduleNames: React.PropTypes.array.isRequired
    },

    render: function() {
        var moduleNames = this.props.moduleNames;

        var modules = moduleNames.length === 0 ? (
            <span>&nbsp;</span>
        ) : this.props.moduleNames.map(function(moduleName, index) {
            var Module = Modules[moduleName];
            return Module ? (
                <Module key={'module-' + moduleName + '-' + index} />
            ) : null;
        });

        return (
            <div className="column">
                {modules}
            </div>
        );
    }

});

module.exports = Column;
