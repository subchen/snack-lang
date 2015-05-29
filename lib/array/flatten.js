/**
 * Flattens a nested array.
 * 
 * @param {array} array
 * @param {boolean} [deep=false]
 * @return {array} Returns the new flattened array.
 */
function flatten(array, deep) {
    if (array == null) {
        return array;
    }
    var result = [];
    for (var i=0; i<array.length; i++) {
        var item = array[i];
        if (item instanceof Array) {
            if (deep) {
                item = flatten(item, true);
            }
            result.push.apply(result, item);
        } else {
            result.push(item);
        }
    }
    return result;
}

module.exports = flatten;
