from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')

@app.route('/sudoku')
def sudoku():
    return render_template('sudoku.html')

@app.route('/go')
def go():
    return render_template('go.html')

@app.route('/go2')
def go2():
    return render_template('go2.html')

@app.route('/tictactoe')
def tictactoe():
    return render_template('tictactoe.html')

@app.route('/connect4')
def connect4():
    return render_template('connect4.html')

if __name__ == '__main__':
    app.run(debug=True)
