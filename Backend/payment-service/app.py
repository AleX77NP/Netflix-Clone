from enum import unique
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

base_dir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.secret_key = "secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@localhost:5432/payments'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class UserPayment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(50), nullable = False, unique=True)
    plan = db.Column(db.Integer, nullable=False)
    last_modified = db.Column(db.String(25), nullable=False)

    def init(self, user, plan, last_modified):
        self.user = user
        self.plan = plan
        self.last_modified = last_modified

class UserPaymentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user', 'plan', 'last_modified')

user_payment_schema = UserPaymentSchema()
user_payments_schema = UserPaymentSchema(many=True)


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Payment service'})

@app.route('/api/payment/register', methods=['POST'])
def register():
    user = request.json['user']
    plan = request.json['plan']
    last_modified = request.json['last_modified']

    user_payment = UserPayment(user=user, plan=plan, last_modified=last_modified)
    db.session.add(user_payment)
    db.session.commit()

    return user_payment_schema.jsonify(user_payment)


@app.route('/api/payment/change/<user>', methods=['PUT'])
def change(user):
    plan = request.json['plan']
    last_modified = request.json['last_modified']

    user_payment = UserPayment.query.filter_by(user=user).first()
    user_payment.plan = plan
    user_payment.last_modified = last_modified

    db.session.commit()

    return user_payment_schema.jsonify(user_payment)

@app.route('/api/payment/remove/<user>', methods=['DELETE'])
def remove(user):
    user_payment = UserPayment.query.filter_by(user=user).first()

    db.session.delete(user_payment)
    db.session.commit()

    return jsonify({'message': 'User payment account deleted.'})

if __name__ == '__main__':
    app.run(debug=False)