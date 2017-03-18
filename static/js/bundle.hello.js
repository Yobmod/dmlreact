/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var Greeting = React.createClass({
        displayName: 'Greeting',

        render: function render() {
            return React.DOM.h1({}, 'Hello, ' + this.props.name + '!');
        }
    });

    ReactDOM.render(React.createElement(Greeting, { name: 'RandoName' }), document.getElementById('greeting'));
})();

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var React = require('react');
//var ReactDOM = require('react-dom');

var App = __webpack_require__(0);
var Hello = __webpack_require__(4);

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var Treat = React.createClass({
        displayName: 'Treat',

        render: function render() {
            var src = 'static/img/icons/icon_' + this.props.type + '.png';
            return React.createElement(
                'li',
                null,
                React.createElement('img', { src: src })
            );
        }
    });

    var Treats = React.createClass({
        displayName: 'Treats',

        render: function render() {
            var treats = this.props.data.map(function (treat, index) {
                return React.createElement(
                    'ul',
                    { key: index },
                    React.createElement(Treat, { type: treat.type }),
                    ';'
                );
            });

            return React.createElement(
                'ul',
                { className: 'inline treats' },
                treats
            );
        }
    });

    var DogFooder = React.createClass({
        displayName: 'DogFooder',

        getInitialState: function getInitialState() {
            return {
                treats: []
            };
        },

        giveTreat: function giveTreat() {
            var treats = this.state.treats;

            var type;
            var rand = Math.random();
            if (rand > 0.80) {
                type = 'steak';
            } else if (rand > 0.4) {
                type = 'bacon';
            } else {
                type = 'bone';
            }

            treats.push({ type: type });

            this.setState({
                treats: treats
            });
        },

        takeTreat: function takeTreat() {
            var treats = this.state.treats;
            if (treats.length == 0) return;

            treats.pop();
            this.setState({
                treats: treats
            });
        },

        render: function render() {
            var addButtonState = this.state.treats.length > 0 ? '' : ' disabled';

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    'Treats: ',
                    this.state.treats.length
                ),
                React.createElement(Treats, { data: this.state.treats }),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { className: 'btn btn-large btn-success', onClick: this.giveTreat },
                        'Good dog!'
                    ),
                    '  ',
                    React.createElement(
                        'button',
                        { className: 'btn btn-large btn-danger ' + addButtonState, onClick: this.takeTreat },
                        'Bad dog!'
                    )
                )
            );
        }
    });

    ReactDOM.render(React.createElement(DogFooder, null), document.getElementById('dogfood'));
})();

/***/ })

/******/ });