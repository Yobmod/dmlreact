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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GRID_SIZE = 40; // size of grid squares

var BoardIntersection = React.createClass({
    displayName: "BoardIntersection",

    handleClick: function handleClick() {
        this.props.board.play(this.props.row, this.props.col);
    },
    render: function render() {
        var style = {
            top: this.props.row * GRID_SIZE, //shift grid about
            left: this.props.col * GRID_SIZE
        };

        var classes = "intersection";
        if (this.props.color != Board.EMPTY) // Board.EMPTY = 0
            classes += " " + (this.props.color == Board.BLACK ? "black" : "white");

        return React.createElement("div", { onClick: this.handleClick, className: classes, style: style });
    }
});

var BoardView = React.createClass({
    displayName: "BoardView",

    getInitialState: function getInitialState() {
        var self = this;
        $(this.props.board).on("update", function (e) {
            console.log(e);
            self.setState({ "board": self.props.board });
        });
        return { "board": this.props.board };
    },
    // styling: function(){
    // 	return style = {
    // 		width: this.state.board.size * GRID_SIZE + 9,  //change board (background) size
    // 		height: this.state.board.size * GRID_SIZE + 9	//extra '10' to allow for grid borders
    // 	};			},
    render: function render() {
        var intersections = [];
        //var factory = x;
        for (var i = 0; i < this.state.board.size; i++) {
            for (var j = 0; j < this.state.board.size; j++) {
                intersections.push(React.createElement(BoardIntersection, {
                    board: this.state.board,
                    color: this.state.board.board[i][j],
                    row: i,
                    col: j,
                    onPlay: this.props.onPlay }));
            }
        }var intersectionkeys = intersections.map(function (intersections, index) {
            return React.createElement(
                "li",
                { key: index },
                intersections
            );
        });
        var style = {
            width: this.state.board.size * GRID_SIZE + 9, //change board (background) size
            height: this.state.board.size * GRID_SIZE + 9 //extra '10' to allow for grid borders
        };
        return React.createElement(
            "div",
            { style: style, id: "board" },
            intersections
        )
        //React.DOM.div({"style": style, "id": "board"}, intersections)
        ;
    }
});

var AlertView = React.createClass({
    displayName: "AlertView",

    getInitialState: function getInitialState() {
        var self = this;
        $(this.props.board).on("atari", function (e) {
            self.setState({ "text": "ATARI!" });
        });
        $(this.props.board).on("suicide", function (e) {
            self.setState({ "text": "SUICIDE!" });
        });
        $(this.props.board).on("update", function (e) {
            self.setState({ "text": null });
        });

        return { "text": null };
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "alerts" },
            this.state.text
        );
    }
});

var PassView = React.createClass({
    displayName: "PassView",

    handleClick: function handleClick(e) {
        this.props.board.pass();
    },
    render: function render() {
        return React.createElement("input", { id: "pass-btn", type: "button", value: "Pass", onClick: this.handleClick });
    }
});

var board = new Board(19);

ReactDOM.render(React.createElement(
    "div",
    { className: "col-sm-8" },
    React.createElement(AlertView, { board: board }),
    React.createElement(PassView, { board: board }),
    React.createElement(BoardView, { board: board })
), document.getElementById('main'));

/***/ })

/******/ });