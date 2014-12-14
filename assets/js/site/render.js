/** @jsx React.DOM */

/**
 * @fileOverview Render the page.
 */

$(document).ready(function() {
    // defined in base.js
    Maraschino.init();

    // render the main React element
    React.render(
        <Maraschino.Container.Base />,
        document.getElementById('container')
    );
});
