"use strict";

//var React = require('react');
//var ReactDOM = require('react-dom');
//const _each = require('lodash/each');   		//imported in go_board. Alterative, use underscore.js in html
//const _isEmpty = require('lodash/isEmpty'); 	//imported in go_board. Alterative, use underscore.js in html


import Board from './components/go/go_board';
var Game = require ('./components/go/go_game');
var Game = require ('./components/go/go_radio_menu');


//todo: calculate winner, overlay screen declare wnner
// stared nodes
// select board style, stone styles
//		turn indicator
	//	undo last move or keep list of moves
	//	float pass, undo, turn, score on scroll
	//  zoom box overlay on float option?
//		make board rerender to any size
//		3 neighbour Go (hexagonal board)
//		tibeten / koreon go
//		make switch player over network
// http://ajhyndman.github.io/go-react-redux-elm/react-redux/
