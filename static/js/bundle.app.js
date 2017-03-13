/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//var React = require('react');
	//var ReactDOM = require('react-dom');

	var App = __webpack_require__(1);
	var Hello = __webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var TweetBox = React.createClass({
	  displayName: "TweetBox",

	  getInitialState: function getInitialState() {
	    return {
	      text: "",
	      photoAdded: false
	    };
	  },
	  handleChange: function handleChange(event) {
	    this.setState({ text: event.target.value });
	  },
	  handleClick: function handleClick(event) {
	    this.setState({ photoAdded: !this.state.photoAdded });
	  },
	  remainingChars: function remainingChars() {
	    if (this.state.photoAdded) {
	      return 140 - 23 - this.state.text.length;
	    } else {
	      return 140 - this.state.text.length;
	    }
	  },
	  overflowAlert: function overflowAlert() {
	    if (this.remainingChars() < 0) {
	      if (this.state.photoAdded) {
	        var beforeOverflowText = this.state.text.substring(140 - 23 - 10, 140 - 23);
	        var overflowText = this.state.text.substring(140 - 23);
	      } else {
	        var beforeOverflowText = this.state.text.substring(140 - 10, 140);
	        var overflowText = this.state.text.substring(140);
	      }
	      return React.createElement(
	        "div",
	        { className: "alert alert-warning" },
	        React.createElement(
	          "strong",
	          null,
	          "Oops! Too Long:"
	        ),
	        "\xA0...",
	        beforeOverflowText,
	        React.createElement(
	          "strong",
	          { className: "bg-danger" },
	          overflowText
	        )
	      );
	    } else {
	      return "";
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "well clearfix" },
	      React.createElement("textarea", { onChange: this.handleChange, className: "form-control tweet_text" }),
	      this.overflowAlert(),
	      React.createElement("br", null),
	      React.createElement(
	        "span",
	        null,
	        React.createElement(
	          "p",
	          { onChange: this.handleChange },
	          this.remainingChars()
	        )
	      ),
	      React.createElement(
	        "button",
	        { disabled: this.state.text.length === 0 && !this.state.photoAdded, className: "btn btn-primary pull-right tweet_submit" },
	        "Tweet"
	      ),
	      React.createElement(
	        "button",
	        { onClick: this.handleClick, className: "btn btn-save pull-right" },
	        this.state.photoAdded ? "✓ Photo Added" : "Add Photo"
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(TweetBox, null), document.getElementById("tweetbox"));

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	(function () {
	    var Greeting = React.createClass({
	        displayName: 'Greeting',

	        render: function render() {
	            return React.DOM.h1({}, 'Hello, ' + this.props.name + '!');
	        }
	    });

	    ReactDOM.render(React.createElement(Greeting, { name: 'RandoName' }), document.getElementById('greeting'));
	})();

/***/ }
/******/ ]);