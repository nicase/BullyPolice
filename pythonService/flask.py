app = Flask(__name__)

route('/', methods=['POST'])
def post():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)