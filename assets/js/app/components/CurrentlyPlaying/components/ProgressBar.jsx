var React = require('react/addons');
var Tools = require('../../../Tools');

/**
 * Displays playback progress of the currently playing media.
 */

var ProgressBar = React.createClass({

    propTypes: {
        timeInfo: React.PropTypes.object.isRequired
    },

    render: function() {
        var timeInfo = this.props.timeInfo;

        return (
            <div className="progress-bar">
                <p className="progress-bar--time current">{Tools.Numbers.renderTime(timeInfo.current)}</p>
                <div className="progress-bar--bar" style={{ width: `${timeInfo.percentage}%` }}></div>
                <p className="progress-bar--time total">{Tools.Numbers.renderTime(timeInfo.total)}</p>
            </div>
        );
    }

});

module.exports = ProgressBar;
