var clone = require('./clone');

/**
 * @param {...object} options
 * @return {object} a new object
 *
 * @example
 * options = defaults(options, {
 *   timeout: 100
 * });
 */
module.exports = function defaults(options) {
    var object = {};

    for (var i = arguments.length - 1; i >= 0; i--) {
        var defaults = arguments[i];
        if (defaults) {
            for (var key in defaults) {
                var value = defaults[key];
                if (typeof value !== 'function') {
                    object[key] = clone(value);
                }
            }
        }
    }

    return object;
};
