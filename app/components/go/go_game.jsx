import Board from './go_board';

var GRID_SIZE = 40; // size of grid squares

var BoardIntersection = React.createClass({
    handleClick: function() {
        this.props.board.play(this.props.row, this.props.col);
    },
    render: function() {
        var style = {
            top: this.props.row * GRID_SIZE, //shift grid about
            left: this.props.col * GRID_SIZE
        };

        var classes = "intersection";
        if (this.props.color != Board.EMPTY)   // Board.EMPTY = 0
            classes += " " + (this.props.color == Board.BLACK ? "black" : "white");

        return (
            <div onClick={this.handleClick} className={classes} style={style}></div>
        );
    }
});

var BoardView = React.createClass({
    getInitialState: function() {
        var self = this;
        $(this.props.board).on("update", function(e) {
            console.log(e);
            self.setState({"board": self.props.board});
        });
        return {"board": this.props.board}
    },
    render: function() {
        var intersections = [];
        for (var i = 0; i < this.state.board.size; i++)
            for (var j = 0; j < this.state.board.size; j++)
                intersections.push(
					<BoardIntersection
                    board= {this.state.board}
                    color= {this.state.board.board[i][j]}
                    row= {i}
                    col= {j}
					onPlay= {this.props.onPlay} />);
		const intersectionkeys = intersections.map((intersections, index) =>
				  <li key={index}>{intersections}</li>	);
        var style = {
            width: this.state.board.size * GRID_SIZE + 9,  //change board (background) size
            height: this.state.board.size * GRID_SIZE + 9	//extra '10' to allow for grid borders
        };
        return (
			<div style={style} id="board">{intersections}</div>
		);
    }
});

var AlertView = React.createClass({
    getInitialState: function() {
        var self = this;
        $(this.props.board).on("atari", function(e) {
            self.setState({"text": "ATARI!"});
        });
        $(this.props.board).on("suicide", function(e) {
            self.setState({"text": "SUICIDE!"});
        });
        $(this.props.board).on("update", function(e) {
            self.setState({"text": null});
        });
        return {"text": null};
    },
    render: function() {
        return (
            <div id="alerts">{this.state.text}</div>
        );
    }
});

var PassView = React.createClass({
    handleClick: function(e) {
        this.props.board.pass();
    },
    render: function() {
        return (
            <input id="pass-btn" type="button" value="Pass" onClick={this.handleClick} />
        );
    }
});



//var gridsize = new Board(19); //default board size
//for x in [9,13,19], var gocontainerx = ...
var GoContainer9 = React.createClass({
		getInitialState: function(){
			return {gridsize: "9"}; //default board size
		},
		render: function(){
			var board = new Board(this.state.gridsize); // Board function defined glabally
			return (<div id={this.state.gridsize}>
					<AlertView board={board} />
		        	<PassView board={board} />
					<BoardView board={board} />
					</div>)
		}
})

var GoContainer13 = React.createClass({
		getInitialState: function(){
			return {gridsize: "13"}; //default board size
		},
		render: function(){
			var board = new Board(this.state.gridsize); // Board function defined glabally
			return (<div id={this.state.gridsize}>
					<AlertView board={board} />
		        	<PassView board={board} />
					<BoardView board={board} />
					</div>)
		}
})
var GoContainer19 = React.createClass({
		getInitialState: function(){
			return {gridsize: "19"}; //default board size
		},
		render: function(){
			var board = new Board(this.state.gridsize); // Board function defined glabally
			return (<div id={this.state.gridsize}>
					<AlertView board={board} />
		        	<PassView board={board} />
					<BoardView board={board} />
					</div>)
		}
})

//=======================================================================

ReactDOM.render(
		<GoContainer9 />,
		    document.getElementById('gocontainer9')
);
ReactDOM.render(
		<GoContainer13 />,
		    document.getElementById('gocontainer13')
);
ReactDOM.render(
		<GoContainer19 />,
		    document.getElementById('gocontainer19')
);
