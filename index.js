var BloomFilter = require('bloomfilter').BloomFilter;
var BitArray = require('bit-array');

module.exports.hash = createHash;
module.exports.compare = compareHashes;

function createHash(words, options){
	options = options || {};

	var bloom = new BloomFilter((options.filterSize || 10) * 32, options.hashSize || 8);
	words.forEach(function(word) { bloom.add(word) } );
	return [].slice.call(bloom.buckets);
}

function compareHashes(hash1, hash2){
	if (hash1.length != hash2.length) throw Error("hashes different lengths");

	var totalAnds = 0;
	var totalOrs = 0;

	for (var i = 0; i < hash1.length; i++){
		totalAnds += new BitArray(32, toHex(hash1[i] & hash2[i])).count()
		totalOrs += new BitArray(32, toHex(hash1[i] | hash2[i])).count()
	}
	//console.log(totalAnds + "/" + totalOrs + " = " + 100 * (totalAnds / totalOrs) + "%\n");
	return totalAnds / totalOrs;
}

function toHex(number) {
    if (number < 0) {
    	number = 0xFFFFFFFF + number + 1;
    }
    return number.toString(16).toUpperCase();
}

/*
compareHashes(createHash("foo bar baz qux".split(" ")), createHash("asdf asd xxx yyy".split(" ")));
compareHashes(createHash("foo bar baz qux".split(" ")), createHash("a".split(" ")));
compareHashes(createHash("foo bar baz qux".split(" ")), createHash("a b".split(" ")));
compareHashes(createHash("foo bar baz qux".split(" ")), createHash("the quick brown fox jumped over the lazy dog".split(" ")));
compareHashes(createHash("the quick brown fox jumped over the lazy cat".split(" ")), createHash("the quick brown fox jumped over the lazy dog".split(" ")));
compareHashes(createHash("if you need to handle things like bit fields or 32-bit colors then you need to deal with signed numbers".split(" ")), createHash("i have a psychological issue that won't allow me to tolerate unnecessary parentheses".split(" ")));
compareHashes(createHash("foo bar baz qux".split(" ")), createHash("foo var baz qux".split(" ")));
*/