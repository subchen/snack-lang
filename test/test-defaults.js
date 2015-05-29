var assert = require('chai').assert;
var defaults = require('../lib/object/defaults');

/* jshint mocha: true */
describe('object.defaults', function() {

    it('get defaults', function() {
        var a = {
            name: 'mango'
        };
        var def1 = {
            name: 'apply',
            color: 'red'
        };
        var def2 = {
            color: 'yellow',
            count: 10
        };
        
        var b = defaults(a, def1, def2);
        assert.strictEqual(b.name, 'mango');
        assert.strictEqual(b.color, 'red');
        assert.strictEqual(b.count, 10);
    });

});
