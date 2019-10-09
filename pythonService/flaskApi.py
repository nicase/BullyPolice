#!flask/bin/python
from flask import Flask, jsonify, request
import sys
import os
import subprocess

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    word = data["discover"]
    ntweets = data["ntweets"]
    interested = data["interested"]
    print('Petició')
    newpid = os.fork()
    if newpid == 0:
        subprocess.run(["python3", "discovery.py", str(word), str(ntweets), str(interested)])
        os.exit()

    print("procés està viu")
    print("pid: " + str(newpid))
    return "Hello, World!"

if __name__ == '__main__':
    app.run()
