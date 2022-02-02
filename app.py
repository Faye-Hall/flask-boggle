from flask import Flask, request, render_template, redirect, flash,session,jsonify
# from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "secrect"
app.config["DEBUG_TBINTERCEPT_REDIRECTS"] = False

# degug =  DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/")
def homepage():
    """show board"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template("/index.html", board=board)

  
@app.route("/check-word")
def check_word():
    """check to see if a word is a valid in the dictionary"""
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({"result": response})

@app.route("/post-score", methods=["POST"])
def check_score():
    """adding the final score to the session"""
    score =  request.json["score"]
    board = session["board"]
    session["score"] = score
    return jsonify(score)

    