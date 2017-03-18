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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Board = function Board(size) {
    this.current_color = Board.BLACK;
    this.size = size;
    this.board = this.create_board(size);
    this.last_move_passed = false;
};

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

Board.prototype.create_board = function (size) {
    var m = [];
    for (var i = 0; i < size; i++) {
        m[i] = [];
        for (var j = 0; j < size; j++) {
            m[i][j] = Board.EMPTY;
        }
    }
    return m;
};

Board.prototype.switch_player = function () {
    this.current_color = this.current_color == Board.BLACK ? Board.WHITE : Board.BLACK;
};

Board.prototype.pass = function () {
    if (this.last_move_passed) this.end_game();
    this.last_move_passed = true;
    this.switch_player();
};

Board.prototype.end_game = function () {
    console.log("GAME OVER");
    window.alert("GAME OVER");
    //for([i][j]){wtotal = 0; if(white || all neighbours == white){wtotal += 1};
    //if(wtotal > btotal){ alert("white wins")}else{alert("black wins")}
};

Board.prototype.play = function (i, j) {
    console.log("Played at " + i + ", " + j);
    this.attempted_suicide = this.in_atari = false;

    if (this.board[i][j] != Board.EMPTY) return false;

    var color = this.board[i][j] = this.current_color;
    var captured = [];
    var neighbors = this.get_adjacent_intersections(i, j);
    var atari = false;

    var self = this;
    _.each(neighbors, function (n) {
        var state = self.board[n[0]][n[1]];
        if (state != Board.EMPTY && state != color) {
            var group = self.get_group(n[0], n[1]);
            console.log(group);
            if (group["liberties"] == 0) captured.push(group);else if (group["liberties"] == 1) atari = true;
        }
    });

    // detect suicide
    if (_.isEmpty(captured) && this.get_group(i, j)["liberties"] == 0) {
        this.board[i][j] = Board.EMPTY;
        this.attempted_suicide = true;
        $(this).trigger("suicide");
        return false;
    }

    var self = this;
    _.each(captured, function (group) {
        _.each(group["stones"], function (stone) {
            self.board[stone[0]][stone[1]] = Board.EMPTY;
        });
    });

    $(this).trigger("update");

    if (atari)
        //
        $(this).trigger("atari");
    this.in_atari = true;
    this.last_move_passed = false;
    this.switch_player();
    return true;
};

/*
 * Given a board position, returns a list of [i,j] coordinates representing
 * orthagonally adjacent intersections
 */
Board.prototype.get_adjacent_intersections = function (i, j) {
    var neighbors = [];
    if (i > 0) neighbors.push([i - 1, j]);
    if (j < this.size - 1) neighbors.push([i, j + 1]);
    if (i < this.size - 1) neighbors.push([i + 1, j]);
    if (j > 0) neighbors.push([i, j - 1]);
    return neighbors;
};

/*
 * Performs a breadth-first search about an (i,j) position to find recursively
 * orthagonally adjacent stones of the same color (stones with which it shares
 * liberties). Returns null for if there is no stone at the specified position,
 * otherwise returns an object with two keys: "liberties", specifying the
 * number of liberties the group has, and "stones", the list of [i,j]
 * coordinates of the group's members.
 */
Board.prototype.get_group = function (i, j) {

    var color = this.board[i][j];
    if (color == Board.EMPTY) return null;

    var visited = {}; // for O(1) lookups
    var visited_list = []; // for returning
    var queue = [[i, j]];
    var count = 0;

    while (queue.length > 0) {
        var stone = queue.pop();
        if (visited[stone]) continue;

        var neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
        var self = this;
        _.each(neighbors, function (n) {
            var state = self.board[n[0]][n[1]];
            if (state == Board.EMPTY) count++;
            if (state == color) queue.push([n[0], n[1]]);
        });

        visited[stone] = true;
        visited_list.push(stone);
    }

    return {
        "liberties": count,
        "stones": visited_list
    };
};

exports.default = Board;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _go_board = __webpack_require__(1);

var _go_board2 = _interopRequireDefault(_go_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = __webpack_require__(5);
//var React = require('react');
//var ReactDOM = require('react-dom');

var Game = __webpack_require__(6);

//todo: calculate winner
//	undo last move or keep list of moves
//		make board rerender to any size
//		3 neighbour Go (hexagonal board)
//		tibeten / koreon go
//		make switch player over network

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _go_board = __webpack_require__(1);

var _go_board2 = _interopRequireDefault(_go_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        if (this.props.color != _go_board2.default.EMPTY) // Board.EMPTY = 0
            classes += " " + (this.props.color == _go_board2.default.BLACK ? "black" : "white");

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
    render: function render() {
        var intersections = [];
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
        );
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

//var gridsize = new Board(19); //default board size

var GoContainer9 = React.createClass({
    displayName: "GoContainer9",

    getInitialState: function getInitialState() {
        return { gridsize: "9" }; //default board size
    },
    render: function render() {
        var board = new _go_board2.default(this.state.gridsize); // Board function defined glabally
        return React.createElement(
            "div",
            { className: "col-sm-8", id: this.state.gridsize },
            React.createElement(AlertView, { board: board }),
            React.createElement(PassView, { board: board }),
            React.createElement(BoardView, { board: board })
        );
    }
});

var GoContainer13 = React.createClass({
    displayName: "GoContainer13",

    getInitialState: function getInitialState() {
        return { gridsize: "13" }; //default board size
    },
    render: function render() {
        var board = new _go_board2.default(this.state.gridsize); // Board function defined glabally
        return React.createElement(
            "div",
            { className: "col-sm-8", id: this.state.gridsize },
            React.createElement(AlertView, { board: board }),
            React.createElement(PassView, { board: board }),
            React.createElement(BoardView, { board: board })
        );
    }
});
var GoContainer19 = React.createClass({
    displayName: "GoContainer19",

    getInitialState: function getInitialState() {
        return { gridsize: "19" }; //default board size
    },
    render: function render() {
        var board = new _go_board2.default(this.state.gridsize); // Board function defined glabally
        return React.createElement(
            "div",
            { className: "col-sm-8", id: this.state.gridsize },
            React.createElement(AlertView, { board: board }),
            React.createElement(PassView, { board: board }),
            React.createElement(BoardView, { board: board })
        );
    }
});

//=======================================================================

ReactDOM.render(React.createElement(GoContainer9, null), document.getElementById('gocontainer9'));
ReactDOM.render(React.createElement(GoContainer13, null), document.getElementById('gocontainer13'));
ReactDOM.render(React.createElement(GoContainer19, null), document.getElementById('gocontainer19'));

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//============================================================
var GoMenu = React.createClass({
	displayName: "GoMenu",

	getInitialState: function getInitialState() {
		return { selectedOption: "9" };
	},

	handleOptionChange: function handleOptionChange(changeEvent) {
		this.setState({ selectedOption: changeEvent.target.value });
	},
	handleFormSubmit: function handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		console.log('You have selected:', this.state.selectedOption);
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				{ onSubmit: this.handleFormSubmit },
				React.createElement(
					"div",
					{ className: "radio" },
					React.createElement(
						"label",
						null,
						React.createElement("input", { type: "radio", value: "9", checked: this.state.selectedOption === "9",
							onChange: this.handleOptionChange }),
						"9"
					)
				),
				React.createElement(
					"div",
					{ className: "radio" },
					React.createElement(
						"label",
						null,
						React.createElement("input", { type: "radio", value: "13", checked: this.state.selectedOption === "13",
							onChange: this.handleOptionChange }),
						"13"
					)
				),
				React.createElement(
					"div",
					{ className: "radio" },
					React.createElement(
						"label",
						null,
						React.createElement("input", { type: "radio", value: "19", checked: this.state.selectedOption === "19",
							onChange: this.handleOptionChange }),
						"19"
					)
				),
				React.createElement(
					"button",
					{ className: "btn btn-default", id: "gomenubutton", type: "submit" },
					"Resize"
				),
				React.createElement(
					"p",
					null,
					" Grid-size: ",
					this.state.selectedOption
				)
			)
		);
	}
});

//=======================================================================

ReactDOM.render(React.createElement(GoMenu, null), document.getElementById('gomenu'));

$(document).ready(function () {
	$("#gomenubutton").click(function (e) {
		var strcont = "#gocontainer";
		var gridsize = strcont.concat($('input:checked').val());
		$('.gocontain').not(gridsize).hide();
		$(gridsize).show();
	});
});

/***/ })

/******/ });