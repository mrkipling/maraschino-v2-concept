/** @jsx React.DOM */

/**
 * @fileOverview Render the page.
 */

// Defined in base.js.
Maraschino.init();

React.renderComponent(
    <Maraschino.Container.Base />,
    document.getElementById('container')
);
