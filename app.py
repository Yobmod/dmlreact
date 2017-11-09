from flask import Flask, render_template, send_from_directory
import os
from flask_static_compress import FlaskStaticCompress

app = Flask(__name__)
compress = FlaskStaticCompress(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello')
def hello():
    return render_template('hello.html')

@app.route('/dogfood')
def dogfood():
    return render_template('dogfood.html')

@app.route('/todos')
def todos():
    return render_template('todos.html')

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

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),'favicon.ico', mimetype='image/x-icon')

COMPRESSOR_ENABLED = False

if __name__ == '__main__':
    app.run(debug=True)
