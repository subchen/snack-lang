[![Build Status](https://travis-ci.org/subchen/snack-lang.svg?branch=master)](https://travis-ci.org/subchen/snack-lang)
[![Code Coverage](https://img.shields.io/coveralls/subchen/snack-lang/master.svg)](https://coveralls.io/r/subchen/snack-lang)
[![NPM Repo](https://img.shields.io/npm/v/snack-lang.svg)](https://www.npmjs.com/package/snack-lang)
[![License](http://img.shields.io/badge/License-Apache_2-red.svg?style=flat)](http://www.apache.org/licenses/LICENSE-2.0)

**SNACK-LANG** is a generic functional library for javascript/node.js
that can be used in the browser or on node.js


# Install

```shell
npm install snack-lang
```

# Example

```js
var snack = require('snack-lang');

console.log(snack.number.format(12345.6789, 2));
```

# APIs

* addEnd
* addStart
* after
* afterLast
* before
* beforeLast
* between
* camelize
* capitalize
* classify
* contains
* dasherize
* decapitalize
* endsWith
* escapeHTML
* hashCode
* interpolate
* isBlank
* isEmpty
* lines
* pad
* padLeft
* padRight
* removeChars
* removeEnd
* removeStart
* repeat
* slugify
* startsWith
* toCharArray
* toString
* template
* truncate
* unescapeHTML


# License

Released under the [Apache 2 License](http://www.apache.org/licenses/LICENSE-2.0).
