// see https://github.com/component/clone/blob/shallow/index.js

/**
 * Clones objects.
 *
 * @param {object} obj - any object
 * @param {boolean} [shallow] - whether to shallow clone only
 * @return {object}
 * @public
 */
function clone(obj, shallow) {
    switch (type(obj)) {
        case 'object':
            return cloneObject(obj, shallow);
        case 'array':
            return cloneArray(obj, shallow);
        case 'regexp':
            return cloneRegExp(obj);
        case 'date':
            return new Date(obj.getTime());
        default: // string, number, boolean, …
            return obj;
    }
}

var toString = Object.prototype.toString;

function type(val) {
    switch (toString.call(val)) {
        case '[object Date]':
            return 'date';
        case '[object RegExp]':
            return 'regexp';
        case '[object Arguments]':
            return 'arguments';
        case '[object Array]':
            return 'array';
        case '[object Error]':
            return 'error';
    }

    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (val !== val) return 'nan';
    if (val && val.nodeType === 1) return 'element';

    val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val)

    return typeof val;
}

function cloneObject(obj, shallow) {
    var copy = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (shallow) {
                switch (type(obj[key])) {
                    case 'object':
                    case 'array':
                        copy[key] = obj[key];
                        continue;
                }
            }
            copy[key] = clone(obj[key]);
        }
    }
    return copy;
}

function cloneArray(obj, shallow) {
    var copy = new Array(obj.length);
    for (var i = 0, l = obj.length; i < l; i++) {
        if (shallow) {
            switch (type(obj[i])) {
                case 'object':
                case 'array':
                    copy[i] = obj[i];
                    continue;
            }
        }
        copy[i] = clone(obj[i]);
    }
    return copy;
}

function cloneRegExp(obj) {
    var flags = '';
    flags += obj.multiline ? 'm' : '';
    flags += obj.global ? 'g' : '';
    flags += obj.ignoreCase ? 'i' : '';
    return new RegExp(obj.source, flags);
}

module.exports = clone;
