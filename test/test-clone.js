var assert = require('chai').assert;
var clone = require('../lib/object/clone');

/* jshint mocha: true */
describe('clone', function() {

    it('clone undefined/null', function() {
        assert.strictEqual(clone(undefined), undefined);
        assert.strictEqual(clone(null), null);
    });

    it('clone string', function() {
        assert.strictEqual(clone(''), '');
        assert.strictEqual(clone('a'), 'a');
    });

    it('clone number', function() {
        assert.strictEqual(clone(0), 0);
        assert.strictEqual(clone(1), 1);
        assert.strictEqual(clone(3.1415926), 3.1415926);
        assert.strictEqual(clone(-3.1415926), -3.1415926);
    });

    it('clone boolean', function() {
        assert.strictEqual(clone(true), true);
        assert.strictEqual(clone(false), false);
    });

    it('clone date', function() {
        var a = new Date();
        assert.strictEqual(clone(a).getTime(), a.getTime());
    });

    it('clone array', function() {
        var a = [
            {foo: 'foo'},
            123
        ];
        var b = clone(a);
        assert.deepEqual(b, a);
        assert.strictEqual(b instanceof Array, true);
        assert.notStrictEqual(b[0], a[0]);

        var c = clone(a, true);
        assert.deepEqual(c, a);
        assert.strictEqual(c instanceof Array, true);
        assert.strictEqual(c[0], a[0]);
    });

    it('clone regexp', function() {
        var a = /abc/gi;
        var b = clone(a);
        assert.deepEqual(b, a);

        a.exec('0123456789abcdef');
        var c = clone(a);
        assert.strictEqual(a.lastIndex, 13);
        assert.strictEqual(c.global, true);
        assert.strictEqual(c.ignoreCase, true);
        assert.strictEqual(c.multiline, false);
    });

    it('clone buffer', function() {
        var a = new Buffer('test buffer');
        assert.deepEqual(clone(a), a);
    });

    it('clone object', function() {
        var a = {
            x1: 123,
            x2: [0, 's', false],
            x3: function() {},
            x4: {
                x: 1,
                y: 'a'
            }
        };

        var b = clone(a);
        assert.deepEqual(b, a);
        assert.notStrictEqual(b.x2, a.x2);
        assert.strictEqual(b.x3, a.x3);
        assert.notStrictEqual(b.x4, a.x4);

        var c = clone(a, true);
        assert.deepEqual(c, a);
        assert.strictEqual(c.x2, a.x2);
        assert.strictEqual(c.x3, a.x3);
        assert.strictEqual(c.x4, a.x4);
    });
    
    it('clone object with constructor', function() {
        function A() {
            this.a = 1;
        }

        var a = new A();
        var b = clone(a);
        assert.deepEqual(b, a);
        assert.strictEqual(b instanceof A, true);
        assert.strictEqual(b.a, 1);
    });
});
