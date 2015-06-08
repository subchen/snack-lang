var deepEqual = require('./object/deepEqual');

/**
 * Removes duplicate items from an array in place.
 *
 * @param {array} array
 * @param {boolean} [useDeepEqual=false]
 * @return {array} Returns the new uniqued array.
 */
module.exports = function unique(array, useDeepEqual) {
    if (array == null) {
        return array;
    }
    if (array.length === 0) {
        return array;
    }

    var results = [];
    for (var i = 0; i < array.length; i++) {
        var duplicated = false;
        var item = array[i];

        for (var j = 0; j < results.length; j++) {
            if (useDeepEqual) {
                if (deepEqual(results[j], item)) {
                    duplicated = true;
                    break;
                }
            }
            else {
                if (results[j] === item) {
                    duplicated = true;
                    break;
                }
            }
        }
        if (!duplicated) {
            results.push(item);
        }
    }
    return results;
};
