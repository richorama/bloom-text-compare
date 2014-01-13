# Bloom Text Compare

## Installation

```
npm install bloom-text-compare
```

## Usage

```js
var textCompare = require('bloom-text-compare');

var hash1 = btc.hash(['an', 'example', 'of', 'a', 'word', 'list']);
// returns an array of 10 x 32 bit integers

var hash2 = btc.hash(['another', 'example', 'of', 'a', 'word', 'list']);

var distance = btc.compare(hash1, hash2);
// returns a number between 0 and 1
```




