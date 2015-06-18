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

	/* window.saveAs
	 * Shims the saveAs method, using saveBlob in IE10.
	 * And for when Chrome and FireFox get round to implementing saveAs we have their vendor prefixes ready.
	 * But otherwise this creates a object URL resource and opens it on an anchor tag which contains the "download" attribute (Chrome)
	 * ... or opens it in a new tab (FireFox)
	 * @author Andrew Dodson
	 * @copyright MIT, BSD. Free to clone, modify and distribute for commercial and personal use.
	 * @see https://gist.github.com/MrSwitch/3552985, https://gist.github.com/phanect/46b692241c6bbe456994
	 */
	if (window) {
		window.saveAs || ( window.saveAs = (window.navigator.msSaveBlob ? function(b,n){ return window.navigator.msSaveBlob(b,n); } : false) || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || (function(){
			// URL's
			window.URL || (window.URL = window.webkitURL);

			if(!window.URL){
				return false;
			}

			return function(blob,name){
				var url = URL.createObjectURL(blob);

				// Test for download link support
				if( "download" in document.createElement("a") ){

					var a = document.createElement("a");
					a.setAttribute("href", url);
					a.setAttribute("download", name);

					// Create Click event
					var clickEvent = document.createEvent ("MouseEvent");
					clickEvent.initMouseEvent ("click", true, true, window, 0,
											   clickEvent.screenX, clickEvent.screenY, clickEvent.clientX, clickEvent.clientY,
											   clickEvent.ctrlKey, clickEvent.altKey, clickEvent.shiftKey, clickEvent.metaKey,
											   0, null);

					// dispatch click event to simulate download
					a.dispatchEvent (clickEvent);

				}
				else{
					// fallover, open resource in new tab.
					window.open(url, "_blank", "");
				}
			};

		})() );
	}
}());
