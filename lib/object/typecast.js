/**
 * convert to object to string if not null
 *
 * @param {*} obj
 * @returns {String} empty if undefined/null
 */
function asString(obj) {
    if (obj == null) {
        return '';
    }
    return obj.toString();
}

/**
 * convert to object to float if not null
 *
 * (null / undefined) === NaN
 * ("1234.5678", 2) === 1234.56
 *
 * @param {*} obj
 * @param {Integer} precision
 * @returns {Float}
 */
function asFloat(obj, precision) {
    if (obj == null) {
        return NaN;
    }
    if (typeof obj === 'number') {
        return obj;
    }
    var num = parseFloat(obj.toString(), 10);
    if (precision !== undefined) {
        num = parseFloat(num.toFixed(precision), 10);
    }
    return num;
}

/**
 * convert to object to integer if not null.
 * If the string starts with '0x' or '-0x', parse as hex.
 *
 * @example
 * (null / undefined) === null
 * ("1234") === 1234
 * ("0xFF") === 255
 *
 * @param {*} obj
 * @returns {Integer}
 */
function asInt(obj) {
    var str;
    if (obj === null) {
        return null;
    }
    if (typeof obj === 'number') {
        return obj.toFixed(0);
    }
    str = obj.toString();
    return (/^\s*-?0x/i.test(str) ? parseInt(str, 16) : parseInt(str, 10));
}

/**
 * Parses the object argument as a boolean.
 *
 * (null, undefined) === false
 * (true, yes, on, y, t, 1) === true
 *
 * @param {*} obj
 * @return {boolean}
 */
function asBoolean(obj) {
    if (obj == null) {
        return false;
    }
    if (typeof obj === 'boolean') {
        return obj;
    }
    if (typeof obj === 'string') {
        var s = obj.toString().toLowerCase();
        return ['true', 'yes', 'on', 't', 'y', '1'].indexOf(s) !== -1;
    }
    return !!obj;
}

/**
 * @example
 * ("2012-01-01 12:00:00") === new Date(2012-01-01 12:00:00)
 *
 * @param {*} obj
 * @return {Date}
 */
function asDate(obj) {
    if (obj == null) {
        return obj;
    }
    if (obj instanceof Date) {
        return obj;
    }
    if (typeof obj === 'number') {
        return new Date(obj);
    }
    return Date.parse(obj.toString());
}

/**
 * @example
 * ("object.func", window) === window.object.func
 *
 * @param {*} fn
 * @param {*} [context]
 * @return {Function}
 */
function asFunction(name, root) {
    if (name == null) {
        return name;
    }
    if (typeof name === 'function') {
        return name;
    }
    
    if (!root) {
        if (typeof global !== 'undefined') {
            root = global;
        } else if (typeof window !== 'undefined') {
            root = window;
        }
    }
    
    var fn = asFunction.get(root, name);
    if (typeof fn === 'function') {
        return fn;
    }

    return null;
}

asFunction.get = function(parent, names) {
    return names.split('.').reduce(function(previousValue, currentValue) {
        return previousValue[currentValue];
    }, parent);
};

/**
 * @example
 * ("[{id:1},{id,2}]") === [{id:1},{id,2}]
 *
 * @param {String} str
 * @return {*}
 */
function asJSON(str) {
    if (str == null) {
        return str;
    }
    if (typeof str === 'string') {
        return JSON.parse(str);
    }
    return str;
}

module.exports = {
    'asString': asString,
    'asFloat': asFloat,
    'asInt': asInt,
    'asBoolean': asBoolean,
    'asDate': asDate,
    'asFunction': asFunction,
    'asJSON': asJSON
}
