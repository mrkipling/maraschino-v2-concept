var ToolsLocalStorage = {};

/**
 * Set local storage.
 * @param {string} key - The name of the store.
 * @param {object} value - The string or object to store.
 */

ToolsLocalStorage.setItem = function(key, value) {
    var valueType = typeof value;

    if (valueType === 'object') {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
    localStorage.setItem(key + '__type', valueType);
};

/**
 * Get local storage.
 * @param {string} key - The name of the store.
 */

ToolsLocalStorage.getItem = function(key) {
    var store = localStorage.getItem(key);
    var valueType = localStorage.getItem(key + '__type');

    if (valueType === 'object') {
        store = JSON.parse(store);
    }

    return store;
};

module.exports = ToolsLocalStorage;
