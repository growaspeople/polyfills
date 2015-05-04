(function() {
	"use strict";

	/*
	 * String.prototype.startsWith
	 * Brought from MDN: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
	 * License: CC0 1.0 Universal (Public Domain) http://creativecommons.org/publicdomain/zero/1.0/
	 */
	if (!String.prototype.startsWith) {
		Object.defineProperty(String.prototype, "startsWith", {
			enumerable: false,
			configurable: false,
			writable: false,
			value: function(searchString, position) {
				position = position || 0;
				return this.lastIndexOf(searchString, position) === position;
			}
		});
	}

	/*
	 * String.prototype.includes
	 * Brought from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
	 * License: CC0 1.0 Universal (Public Domain) http://creativecommons.org/publicdomain/zero/1.0/
	 */
	if (!String.prototype.includes) {
		String.prototype.includes = function() {
			return String.prototype.indexOf.apply(this, arguments) !== -1;
		};
	}

	/*
	 * Array.prototype.includes
	 * Brought from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
	 * License: CC0 1.0 Universal (Public Domain) http://creativecommons.org/publicdomain/zero/1.0/
	 */
	if (![].includes) {
		Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
			var O = Object(this);
			var len = parseInt(O.length) || 0;
			if (len === 0) {
				return false;
			}
			var n = parseInt(arguments[1]) || 0;
			var k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) {k = 0;}
			}
			var currentElement;
			while (k < len) {
				currentElement = O[k];
				if (searchElement === currentElement ||
					(searchElement !== searchElement && currentElement !== currentElement))
				{
					return true;
				}
				k++;
			}
			return false;
		};
	}
}());
