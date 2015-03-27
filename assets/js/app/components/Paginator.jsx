var React = require('react');

/**
 * Renders a paginated list of items, with navigation.
 */

var Paginator = React.createClass({

    propTypes: {
        items: React.PropTypes.array.isRequired,
        renderItem: React.PropTypes.func.isRequired,
        defaultPage: React.PropTypes.number,
        pageSize: React.PropTypes.number
    },

    navigate: function(direction='next') {
        var newPage = direction === 'next' ? this.state.page + 1 : this.state.page - 1;
        this.setState({
            page: newPage
        });
    },

    getDefaultProps: function() {
        return {
            defaultPage: 0,
            pageSize: 5
        };
    },

    getInitialState: function() {
        return {
            page: this.props.defaultPage
        }
    },

    render: function() {
        var firstItemIndex = this.state.page * this.props.pageSize;
        var pageItems = this.props.items.slice(firstItemIndex, firstItemIndex + this.props.pageSize);

        var navPrevPage = firstItemIndex < this.props.pageSize ? null : (
            <div className="pagination--navigation--btn pagination--navigation--prev" onClick={this.navigate.bind(null, 'prev')}>
                &laquo;
            </div>
        );

        var navNextPage = firstItemIndex >= (this.props.items.length - this.props.pageSize - 1) ? null : (
            <div className="pagination--navigation--btn pagination--navigation--next" onClick={this.navigate.bind(null, 'next')}>
                &raquo;
            </div>
        );

        return (
            <div className="pagination">
                {pageItems.map(this.props.renderItem)}
                <div className="pagination--navigation">
                    {navPrevPage}
                    {navNextPage}
                </div>
            </div>
        );
    }

});

module.exports = Paginator;
