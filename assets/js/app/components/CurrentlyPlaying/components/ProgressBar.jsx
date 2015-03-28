var React = require('react');

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
                <div className="progress-bar--bar" style={{ width: `${timeInfo.percentage}%` }}></div>
            </div>
        );
    }

});

module.exports = ProgressBar;
