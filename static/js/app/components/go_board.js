var Board = function (size) {
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
        for (var j = 0; j < size; j++)
            m[i][j] = Board.EMPTY;
    }
    return m;
};
Board.prototype.switch_player = function () {
    this.current_color = this.current_color == Board.BLACK ? Board.WHITE : Board.BLACK;
};
Board.prototype.pass = function () {
    if (this.last_move_passed)
        this.end_game();
    this.last_move_passed = true;
    this.switch_player();
};
Board.prototype.end_game = function () {
    console.log("GAME OVER");
};
Board.prototype.play = function (i, j) {
    console.log("Played at " + i + ", " + j);
    if (this.board[i][j] != Board.EMPTY)
        return;
};
