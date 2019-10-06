#!flask/bin/python
from flask import Flask, jsonify, request
from hashtag import Hashtag

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():

    data = request.get_json()
    word = data["discover"]
    ntweets = data["ntweets"]
    interested = data["interested"]

    Hashtag(data)

    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
