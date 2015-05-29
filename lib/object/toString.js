module.exports = function toString(object) {
    if (object === undefined) {
        return '<undefined>';
    }
    if (object === null) {
        return '<null>';
    }
    return object.toString();
};
