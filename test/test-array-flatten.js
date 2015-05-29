var assert = require('chai').assert;
var flatten = require('../lib/array/flatten');

/* jshint mocha: true */
describe('array.flatten', function() {

    it('Flattens a nested array', function() {
        assert.deepEqual(flatten([1, [2, [3]]]), [1, 2, [3]]);
    });

    it('Flattens a nested array (deep)', function() {
        assert.deepEqual(flatten([1, [2, [3]]], true), [1, 2, 3]);
    });
});
