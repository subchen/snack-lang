function isUndefined(obj) {
    return obj === undefined;
}

function isNull(obj) {
    return obj === null;
}

function isNullOrUndefined(obj) {
    return obj == null;
}

function isNumber(obj) {
    return typeof obj === 'number';
}

function isBoolean(obj) {
    return typeof obj === 'boolean';
}

function isString(obj) {
    return typeof obj === 'string';
}

function isSymbol(obj) {
    return typeof obj === 'symbol';
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

function isArray(obj) {
    return Array.isArray(obj);
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isRegExp(obj) {
    return typeof obj === 'object' && obj instanceof RegExp;
}

function isDate(obj) {
    return typeof obj === 'object' && obj instanceof Date;
}

function isError(obj) {
    return typeof obj === 'object' && e instanceof Error);
}

function isPrimitive(obj) {
    var types = ['boolean', 'number', 'string', 'symbol', 'undefined'];
    return obj === null || types.indexOf(typeof obj) !== -1;
}

/**
 * Checks if the value is created by the `Object` constructor.
 */
function isPlainObject(obj) {
    var toString = Object.prototype.toString;
    return value && typeof value === 'object' && toString.call(obj) === '[object Object]';
};

module.exports = {
    'isUndefined': isUndefined,
    'isNull': isNull,
    'isNullOrUndefined': isNullOrUndefined,
    'isObject': isObject,
    'isNumber': isNumber,
    'isBoolean': isBoolean,
    'isString': isString,
    'isDate': isDate,
    'isArray': isArray,
    'isRegExp': isRegExp,
    'isSymbol': isSymbol,
    'isError': isError,
    'isFunction': isFunction,
    'isPrimitive': isPrimitive,
    'isPlainObject': isPlainObject
};
