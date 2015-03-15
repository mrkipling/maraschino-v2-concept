/**
 * @fileOverview Toolbox / helper functions.
 */

var Tools = {};

/**
 * Wrapper for console.log.
 * @param {string} message - The message to log to the console.
 * @param {string} type - Log type. Defaults to 'log'. See code for accepted values.
 */

Tools.log = function (message, type) {
    type = type || 'log';
    switch (type) {
    case 'warn':
        console.warn(message); break;
    case 'error':
        console.error(message); break;
    case 'info':
        console.info(message); break;
    case 'group':
        console.group(message); break;
    case 'groupCollapsed':
        console.groupCollapsed(message); break;
    case 'groupEnd':
        // ignore value of message
        console.groupEnd(); break;
    default:
        console.log(message);
    }
};

/**
 * Returns a setting value stored in a meta tag.
 * @param {string} setting - The setting to return the value of.
 * @param {string} type - How should the setting be parsed?
 */

Tools.getSetting = function(setting, type) {
    var val = document.querySelectorAll('meta[name=columns]')[0].getAttribute('content');

    switch (type) {
        case 'json':
        // return JSON (have to replace single quotes with double quotes for
        // the parser to recognise it as valid JSON)
        return JSON.parse(val.replace(/'/g, '\"'));

        case 'int':
        // returns an int
        return parseInt(val);

        default:
        // return a string
        return val;
    }
};

module.exports = Tools;
