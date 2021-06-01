import os
from flask import Flask, jsonify, request
from flask.json import load
from flask.wrappers import Response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import py_eureka_client.eureka_client as eureka_client
from dotenv import load_dotenv
from pathlib import Path
from flask_cors import CORS
from functools import wraps
import jwt

rest_port = 9004

eureka_client.init(eureka_server="http://eureka-spring:8761/eureka", app_name="PAYMENT-SERVICE", instance_port=rest_port)

base_dir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()

env_path = Path('.')/'.env'

load_dotenv(dotenv_path=env_path)

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

app.secret_key = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@postgres:5432/payments'
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

def auth_middleware(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        res = '{"message": "Unauthorized request"}'
        token = request.json['token']

        try:
            data = jwt.decode(token, os.getenv('JWT_SECRET'),algorithms=["HS256"])
            user = data['user']
            return func(*args, **kwargs, user=user)
        except:
            return Response(response=res, mimetype='application/json', status=401)

    return decorated_function



@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Payment service'})

@app.route('/payment', methods=['GET'])
def payments():
    payments = UserPayment.query.all()
    return user_payments_schema.jsonify(payments)

@app.route('/payment/user', methods=['GET'])
@auth_middleware
def payment(user):
    print(user)
    user_payment = UserPayment.query.filter_by(user=user).first()

    return jsonify(user_payment.plan)

@app.route('/payment/change', methods=['PUT'])
@auth_middleware
def change(user):
    plan = request.json['plan']
    last_modified = request.json['last_modified']

    user_payment = UserPayment.query.filter_by(user=user).first()
    user_payment.plan = plan
    user_payment.last_modified = last_modified

    db.session.commit()

    return user_payment_schema.jsonify(user_payment)

@app.route('/payment/remove', methods=['DELETE'])
@auth_middleware
def remove(user):
    user_payment = UserPayment.query.filter_by(user=user).first()

    db.session.delete(user_payment)
    db.session.commit()

    return jsonify({'message': 'User payment account deleted.'})

if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0',debug=True, port=9004)