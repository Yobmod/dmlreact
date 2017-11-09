/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const ReactDOM = __webpack_require__(4);
const todos_1 = __webpack_require__(5);
ReactDOM.render(React.createElement(todos_1.Todos, null), document.getElementById('todos'));


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(1);
const createReactClass = __webpack_require__(6);
exports.Todos = createReactClass({
    getInitialState: function () {
        return {
            todos: [
                "I am done",
                "I am not done"
            ]
        };
    },
    addTodoItem: function (todoItem) {
        this.state.todos.push(todoItem);
        this.setState({ todos: this.state.todos });
    },
    render: function () {
        var todos = this.state.todos.map(function (todo) {
            return React.createElement("div", null, todo);
        });
        return React.createElement("div", null,
            React.createElement("h3", null, "Todo(s)"),
            todos,
            React.createElement(TodoForm, { addItem: this.addTodoItem }));
    }
});
var TodoForm = createReactClass({
    getInitialState: function () {
        return {
            todoInput: ""
        };
    },
    handleClick: function (e) {
        e.preventDefault();
        this.props.addTodoItem(this.state.todoInput);
        this.setState({ todoInput: "" });
    },
    handleOnChange: function (e) {
        e.preventDefault();
        this.setState({ todoInput: e.target.value });
    },
    render: function () {
        return React.createElement("div", null,
            React.createElement("br", null),
            React.createElement("input", { type: "text", value: this.state.todoInput, onChange: this.handleOnChange }),
            React.createElement("button", { onClick: this.handleClick }, "Add Todo"));
    }
});


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = createReactClass;

/***/ })

/******/ });