var btc = require('./index.js');
var assert = require('assert');

var hash1 = btc.hash(['an', 'example', 'of', 'a', 'word', 'list']);
assert(hash1.length === 10);

var hash2 = btc.hash(['another', 'example', 'of', 'a', 'word', 'list']);

var distance = btc.compare(hash1, hash2);

assert(distance);
