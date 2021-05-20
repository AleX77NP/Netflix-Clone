import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

base_dir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.secret_key = "secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class UserPayment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(50), nullable = False)
    plan = db.Column(db.Integer, nullable=False)
    last_modified = db.Column(db.String(25), nullable=False)

    def init(self, user, plan, last_modified):
        self.user = user
        self.plan = plan
        self.last_modified = last_modified

@app.route('/', methods=['GET'])
def index():
    return jsonify({'msg': 'Payment service'})

if __name__ == '__main__':
    app.run(debug=False)