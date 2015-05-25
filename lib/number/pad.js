var padLeft = require('snack-string').padLeft;

module.exports = function pad(num, width) {
    return padLeft(num.toString(), width, '0');
};
