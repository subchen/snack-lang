var slice = Array.prototype.slice;

function deepEqual(actual, expected) {
    if (actual === expected) {
        return true;
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
        if (actual.length != expected.length) return false;
        for (var i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i]) return false;
        }
        return true;
    } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
    } else if (actual instanceof RegExp && expected instanceof RegExp) {
        return actual.source === expected.source &&
            actual.global === expected.global &&
            actual.multiline === expected.multiline &&
            actual.lastIndex === expected.lastIndex &&
            actual.ignoreCase === expected.ignoreCase;
    } else if (typeof actual !== 'object' && typeof actual !== 'object') {
        return actual == expected;
    } else {
        return objEquiv(actual, expected);
    }
}

function isUndefinedOrNull(value) {
    return value === null || value === undefined;
}

function isArguments(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
        return false;
    }

    // an identical 'prototype' property.
    if (a.prototype !== b.prototype) {
        return false;
    }

    //~~~I've managed to break Object.keys through screwy arguments passing.
    //   Converting to array solves the problem.
    if (isArguments(a)) {
        if (!isArguments(b)) {
            return false;
        }
        a = slice.call(a);
        b = slice.call(b);
        return deepEqual(a, b);
    }

    try {
        var ka = Object.keys(a);
        var kb = Object.keys(b);
        var key, i;
    } catch (e) { //happens when one is a string literal and the other isn't
        return false;
    }

    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length != kb.length) {
        return false;
    }

    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();

    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i]) {
            return false;
        }
    }

    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key])) {
            return false;
        }
    }

    return true;
}

module.exports = deepEqual;
