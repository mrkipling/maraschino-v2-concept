var ToolsNumbers = {};

ToolsNumbers.leadingZero = function(num, places=2) {
    return ('0' + num).slice(places * -1);
};

ToolsNumbers.renderTime = function(time) {
    var hours = time.hours > 0 ? `${time.hours}:` : '';
    return `${hours}${ToolsNumbers.leadingZero(time.minutes)}:${ToolsNumbers.leadingZero(time.seconds)}`;
}

module.exports = ToolsNumbers;
