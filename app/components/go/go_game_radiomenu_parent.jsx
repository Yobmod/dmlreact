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
	// styling: function(){
	// 	return style = {
	// 		width: this.state.board.size * GRID_SIZE + 9,  //change board (background) size
	// 		height: this.state.board.size * GRID_SIZE + 9	//extra '10' to allow for grid borders
	// 	};			},
    render: function() {
        var intersections = [];
		//var factory = x;
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
			//React.DOM.div({"style": style, "id": "board"}, intersections)
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

var GoContainer = React.createClass({
		getInitialState: function(){
			return {gridsize: "9"}; //default board size
		},
		sizing: function() {
      		this.setState({	gridsize: this.refs.Rm.state.selectedOption	})
		},

		// siZing: function(size) {
		// 	this.setState({gridsize: size.this.children.state.gridsize});
		// 	console.log(this.state.gridsize);
		// 	console.log(this.props.gridsize);
		// 		},
		render: function(){
			var board = new Board(this.state.gridsize); // Board function defined glabally
		return (<div  className="col-sm-8">
					<Radiomenu gridsize={this.state.gridsize} ref="Rm"/>
		        	<AlertView board={board} />
		        	<PassView board={board} />
					<BoardView board={board} />
					{this.state.gridsize}{this.refs.Rm.state.selectedOption	}
				</div>)
		}
})

//============================================================
var Radiomenu = React.createClass({
	getInitialState: function () {
    	return {selectedOption: "19", gridsize: "19"};
  	},

	handleOptionChange: function (changeEvent) {
  		this.setState({selectedOption: changeEvent.target.value});
	},
	handleFormSubmit: function (formSubmitEvent) {
  		formSubmitEvent.preventDefault();
		this.setState({gridsize: this.state.selectedOption});
		console.log('You have selected:', this.state.gridsize);

		},
  	render: function () {
		var board = new Board(this.state.gridsize); // Board function is defined glabally
		return (
			<div>
		      <form onSubmit={this.handleFormSubmit}>
		        	<div className="radio">
		          		<label><input type="radio" value="9" checked={this.state.selectedOption === "9"}
						onChange={this.handleOptionChange}/>9</label>
		        	</div>
					<div className="radio">
						<label><input type="radio" value="13" checked={this.state.selectedOption === "13"}
						onChange={this.handleOptionChange}/>13</label>
					</div>
					<div className="radio">
						<label><input type="radio" value="19" checked={this.state.selectedOption === "19"}
						onChange={this.handleOptionChange}/>19</label>
					</div>
					<button className="btn btn-default" type="submit">Resize</button>
					<p> Grid-size: {this.state.selectedOption}</p>
		      </form>
			  <AlertView board={board} />
			  <PassView board={board} />
			  <BoardView board={board} />
			  </div>
			  	)
			}
  		})

//=======================================================================

ReactDOM.render(
		<Radiomenu />,
		    document.getElementById('main')
);
