from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return jsonify({'msg': 'Payment service'})

if __name__ == '__main__':
    app.run(debug=False)