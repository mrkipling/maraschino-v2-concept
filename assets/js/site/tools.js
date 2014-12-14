/** @jsx React.DOM */

/**
 * @fileOverview Toolbox / helper functions.
 */

/**
 * Returns a setting value stored in a meta tag.
 * @param {string} setting - The setting to return the value of.
 */

Maraschino.Tools.getSetting = function (setting, type) {
    var val = document.querySelectorAll('meta[name=' + setting + ']')[0].getAttribute('content');

    switch (type) {
        case 'json':
        // return JSON (have to replace single quotes with double quotes for
        // the parser to recognise it as valid JSON)
        return JSON.parse(val.replace(/'/g, '\"'));

        case 'int':
        return parseInt(val);

        default:
        // return a string
        return val;
    }
};
