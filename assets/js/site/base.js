/** @jsx React.DOM */

/**
 * @fileOverview Base JS file.
 */

var Maraschino = {
    Modules: {},
    Settings: {},
    Tools: {}
};

Maraschino.init = function () {

    // populate settings

    Maraschino.Settings.columns = Maraschino.Tools.getSetting('columns', 'json');
    Maraschino.Settings.num_columns = Maraschino.Tools.getSetting('num_columns', 'int');

};
