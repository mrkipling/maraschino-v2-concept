/**
 * Wrapper for console.log.
 * @param {string} message - The message to log to the console.
 * @param {string} type - Log type. Defaults to 'log'. See code for accepted values.
 */

var ToolsLog = function(message, type='log') {
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

module.exports = ToolsLog;
