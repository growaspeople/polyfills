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
}());
