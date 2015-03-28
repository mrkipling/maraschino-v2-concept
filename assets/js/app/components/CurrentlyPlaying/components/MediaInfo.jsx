var React = require('react');

/**
 * Media info.
 */

var MediaInfo = React.createClass({

    propTypes: {
        media: React.PropTypes.object.isRequired
    },

    render: function() {
        var media = this.props.media;
        var mediaInfo;

        switch(media.type) {
            case 'movie':
                mediaInfo = (
                    <div className="currently-playing--media-info">
                        <h2 className="currently-playing--media-info--title">{media.title}</h2>
                        <div className={`currently-playing--media-info--rating media-rating rating-${media.rating}`}></div>
                        <p>{media.year}</p>
                    </div>
                );
                break;

            case 'episode':
                mediaInfo = (
                    <div className="currently-playing--media-info">
                        <h2 className="currently-playing--media-info--title">{media.showtitle}</h2>
                        <p>Season {media.season}, Episode {media.episode}</p>
                        <p>{media.title}</p>
                    </div>
                );
                break;
        }

        return (
            <div className="currently-playing--media-info">
                {mediaInfo}
            </div>
        );
    }

});

module.exports = MediaInfo;
