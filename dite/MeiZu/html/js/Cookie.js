"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}var Cookie=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getAllCookie",value:function(){return document.cookie.split("; ")}},{key:"getAllKey",value:function(){var e=this.getAllCookie();return Array.from(e.map(function(e){return e.split("=")[0]}))}},{key:"getValue",value:function(e){for(var t=this.getAllCookie(),o=0;o<t.length;o++)if(0===t[o].indexOf("".concat(e,"=")))return t[o].split("=")[1]}},{key:"setCookie",value:function(e,t,o){var n=new Date;n.setDate(n.getDate()+o),document.cookie="".concat(e,"=").concat(t,";expires=").concat(void 0===o?"session":n)}},{key:"removeCookie",value:function(e){this.setCookie(e,null,-1)}},{key:"clearCookie",value:function(){var t=this;this.getAllKey().forEach(function(e){return t.removeCookie(e)})}}]),e}();