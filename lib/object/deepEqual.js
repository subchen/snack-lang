var slice = Array.prototype.slice;

function deepEqual(actual, expected) {
    // enforce Object.is +0 !== -0
    if (actual === 0 && expected === 0) {
        return areZerosEqual(actual, expected);
    } else if (actual === expected) {
        return true;
    } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
    } else if (isNumberNaN(actual)) {
        return isNumberNaN(expected);
    } else if (typeof actual != 'object' && typeof expected != 'object') {
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

function isNumberNaN(value) {
    // NaN === NaN -> false
    return typeof value == 'number' && value !== value;
}

function areZerosEqual(zeroA, zeroB) {
    // (1 / +0|0) -> Infinity, but (1 / -0) -> -Infinity and (Infinity !== -Infinity)
    return (1 / zeroA) === (1 / zeroB);
}

function objEquiv(a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
        return false;

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
        if (ka[i] != kb[i])
            return false;
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
