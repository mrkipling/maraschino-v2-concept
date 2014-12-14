/**
 * Module: RecentEpisodes
 * Recently added episodes.
 */

Maraschino.Modules.RecentEpisodes = React.createClass({
    getInitialState: function () {
        return {};
    },

    loadModule: function () {
        $.ajax({
            url: '/module/recent/episodes/',
            dataType: 'json',
            success: function (data) {
                this.setState(data);
            }.bind(this),
            error: function () {
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadModule();
    },

    render: function() {
        return (
            <div id="module-recent" className="module">
                <p>Recently Added Episodes</p>
                <Maraschino.Modules.Recent />
            </div>
        );
    }
});

Maraschino.Modules.Recent = React.createClass({displayName: 'Recent',
    render: function () {
        return (
            <div className="inner" />
        );
    }
});
