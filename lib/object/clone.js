// see https://github.com/component/clone/blob/shallow/index.js

/**
 * Clones (copies) an Object using deep copying.
 *
 * @param {object} parent - the object to be cloned
 * @param {boolean} [shadow=false} - shadow or deep clone, default is deep clone
 * @return {object}
 */
function clone(parent, shadow) {
    if (parent === null) {
        return null;
    }

    // undefined, string, number, ...
    if (typeof parent !== 'object') {
        return parent;
    }

    var child;

    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(parent)) {
        child = new Buffer(parent.length);
        parent.copy(child);
        return child;
    }

    var s = Object.prototype.toString.call(parent);
    if (s === '[object Date]') {
        return new Date(parent.getTime());
    } else if (s === '[object RegExp]') {
        var flags = '';
        flags += parent.multiline ? 'm' : '';
        flags += parent.global ? 'g' : '';
        flags += parent.ignoreCase ? 'i' : '';

        child = new RegExp(parent.source, flags);
        if (parent.lastIndex) {
            child.lastIndex = parent.lastIndex;
        }
        return child;
    }

    var proto;
    if (s === '[object Array]') {
        child = [];
    } else {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
    }

    // copy fields
    for (var i in parent) {
        if (proto) {
            // skip readonly field
            var attrs = Object.getOwnPropertyDescriptor(proto, i);
            if (attrs && attrs.set == null) {
                continue;
            }
        }
        child[i] = shadow ? parent[i] : clone(parent[i], false);
    }

    return child;
}

module.exports = clone;
