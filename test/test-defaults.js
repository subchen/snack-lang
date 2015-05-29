var assert = require('chai').assert;
var defaults = require('../lib/object/defaults');

/* jshint mocha: true */
describe('defaults', function() {

    it('get defaults', function() {
        var a = {
            flavor: 'chocolate'
        };
        var def = {
            flavor: 'vanilla',
            sprinkles: 'lots'
        };

        var b = defaults(a, def);
        assert.strictEqual(b.flavor, 'chocolate');
        assert.strictEqual(b.sprinkles, 'lots');
    });

});
