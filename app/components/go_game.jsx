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
                intersections.push(BoardIntersection({
                    board: this.state.board,
                    color: this.state.board.board[i][j],
                    row: i,
                    col: j
                }));
        var style = {
            width: this.state.board.size * GRID_SIZE + 9,  //change board (background) size
            height: this.state.board.size * GRID_SIZE + 9	//extra '10' to allow for grid borders
        };
        return React.DOM.div({"style": style, "id": "board"}, intersections);
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


var ContainerView = React.createClass({
    getInitialState: function() {
        return {'board': this.props.board};
    },
    onBoardUpdate: function() {
        this.setState({"board": this.props.board});
    },
    render: function() {
        return (
            <div>
                <AlertView board={this.state.board} />
                <PassView board={this.state.board} />
                <BoardView board={this.state.board}
                    onPlay={this.onBoardUpdate.bind(this)} />
            </div>
        )
    }
});

var board = new Board(19);

React.renderComponent(
    <ContainerView board={board} />,
    document.getElementById('main')
);
