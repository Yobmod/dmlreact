var Board = function(size) {
    this.current_color = Board.BLACK;
    this.size = size;
    this.board = this.create_board(size);
    this.last_move_passed = false;
};

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

Board.prototype.create_board = function(size) {
    var m = [];
    for (var i = 0; i < size; i++) {
        m[i] = [];
        for (var j = 0; j < size; j++)
            m[i][j] = Board.EMPTY;
    }
    return m;
};

Board.prototype.switch_player = function() {
    this.current_color = this.current_color == Board.BLACK ? Board.WHITE : Board.BLACK;
};

Board.prototype.pass = function() {
    if (this.last_move_passed)
        this.end_game();
    this.last_move_passed = true;
    this.switch_player();
};

Board.prototype.end_game = function() {
    console.log("GAME OVER");
};

Board.prototype.play = function(i, j) {
    console.log("Played at " + i + ", " + j);
	this.attempted_suicide = this.in_atari = false;

	    if (this.board[i][j] != Board.EMPTY)
	        return false;

    var color = this.board[i][j] = this.current_color;
    var captured = [];
    var neighbors = this.get_adjacent_intersections(i, j);
    var atari = false;

    var self = this;
    _.each(neighbors, function(n) {
        var state = self.board[n[0]][n[1]];
        if (state != Board.EMPTY && state != color) {
            var group = self.get_group(n[0], n[1]);
            console.log(group);
            if (group["liberties"] == 0)
                captured.push(group);
            else if (group["liberties"] == 1)
                atari = true;
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
    _.each(captured, function(group) {
        _.each(group["stones"], function(stone) {
            self.board[stone[0]][stone[1]] = Board.EMPTY;
        });
    });

    $(this).trigger("update");

    if (atari)
		this.in_atari = true;
        $(this).trigger("atari");

    	this.last_move_passed = false;
    	this.switch_player();
		return true;
};
er
/*
 * Given a board position, returns a list of [i,j] coordinates representing
 * orthagonally adjacent intersections
 */
Board.prototype.get_adjacent_intersections = function(i , j) {
    var neighbors = [];
    if (i > 0)
        neighbors.push([i - 1, j]);
    if (j < this.size - 1)
        neighbors.push([i, j + 1]);
    if (i < this.size - 1)
        neighbors.push([i + 1, j]);
    if (j > 0)
        neighbors.push([i, j - 1]);
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
Board.prototype.get_group = function(i, j) {

    var color = this.board[i][j];
    if (color == Board.EMPTY)
        return null;

    var visited = {}; // for O(1) lookups
    var visited_list = []; // for returning
    var queue = [[i, j]];
    var count = 0;

    while (queue.length > 0) {
        var stone = queue.pop();
        if (visited[stone])
            continue;

        var neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
        var self = this;
        _.each(neighbors, function(n) {
            var state = self.board[n[0]][n[1]];
            if (state == Board.EMPTY)
                count++;
            if (state == color)
                queue.push([n[0], n[1]]);
        });

        visited[stone] = true;
        visited_list.push(stone);
    }

    return {
        "liberties": count,
        "stones": visited_list
    };
}

var GRID_SIZE = 40; // size of grid squares

var BoardIntersection = React.createClass({
    handleClick: function() {
        this.props.board.play(this.props.row, this.props.col);
    },
	styling: function(){
		style = {
		top: this.props.row * GRID_SIZE, //shift grid about
		left: this.props.col * GRID_SIZE}
	},

	classing: function(){
		 var classes = "intersection";
		 if (this.props.color != Board.EMPTY)   // Board.EMPTY = 0
			classes += " " + (this.props.color == Board.BLACK ? "black" : "white");
			return classes;
	},
    render: function() {
        return (
            <div onClick={this.handleClick} className={this.state.classing} style={this.state.styling}></div>
        );
    }
});

var BoardView = React.createClass({
    getInitialState: function() {
        var self = this;
		var intersections = [];
        $(this.props.board).on("update", function(e) {
            console.log(e);
            self.setState({"board": self.props.board});
        	});
        return {"board": this.props.board}
    },
	styling: function (){
		 		 return style = {
		width: this.state.board.size * GRID_SIZE + 9,  //change board (background) size
		height: this.state.board.size * GRID_SIZE + 9}	//extra '10' to allow for grid borders
},
grid: function() {
			var intersections = [];
			for (var i = 0; i < this.state.board.size; i++)
			for (var j = 0; j < this.state.board.size; j++)
					intersections.push(BoardIntersection({
						board: this.state.board,
						color: this.state.board.board[i][j],
						row: i,
						col: j
				}));
},
    render: function(){

        	return(
				 <div style = {this.state.styling} id = "board">{this.props.board.intersections}</div>
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
-------------------------------------------------------------------------
var Radiomenu = React.createClass({
	getInitialState: function () {
    return {
      selectedOption: 'option3'
    };
  },
  handleOptionChange: function (changeEvent) {
  this.setState({
    selectedOption: changeEvent.target.value
  });
},
handleFormSubmit: function (formSubmitEvent) {
  formSubmitEvent.preventDefault();
	console.log('You have selected:', this.state.selectedOption);
	return this.state.selectedOption;
  },

  render: function () {
    return (
		<div className="container">
		  <div className="row">
		    <div className="col-sm-12">

		      <form onSubmit={this.handleFormSubmit}>
		        	<div className="radio">
		          		<label><input type="radio" value="option1" checked={this.state.selectedOption === 'option1'}
						onChange={this.handleOptionChange}/>Option 1</label>
		        	</div>
					<div className="radio">
						<label><input type="radio" value="option2" checked={this.state.selectedOption === 'option2'}
						onChange={this.handleOptionChange}/>Option 2</label>
					</div>
					<div className="radio">
						<label><input type="radio" value="option3" checked={this.state.selectedOption === 'option3'}
						onChange={this.handleOptionChange}/>Option 3</label>
					</div>
					<button className="btn btn-default" type="submit">Save</button>
		      </form>
		    </div>
		  </div>
		</div>
)}
  })

---------------------------------------------------------------------
var board = new Board(9);

ReactDOM.render(
    <div>
        <AlertView board={board} />
		<Radiomenu />
        <PassView board={board} />
		<BoardView board={board} />
    </div>,
    document.getElementById('main')
);
