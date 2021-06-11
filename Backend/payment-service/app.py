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
from py_zipkin.zipkin import zipkin_span, create_http_headers_for_new_span, ZipkinAttrs, Kind, zipkin_client_span
from py_zipkin.request_helpers import create_http_headers
from py_zipkin.encoding import Encoding
import requests

rest_port = 9004

eureka_client.init(eureka_server="http://eureka-spring:8761/eureka", app_name="PAYMENT-SERVICE", instance_port=rest_port)

base_dir = os.path.abspath(os.path.dirname(__file__))

#load_dotenv()

#env_path = Path('.')/'.env'

#load_dotenv(dotenv_path=env_path)

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


app.secret_key = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@postgres:5432/payments'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'db.sqlite')
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
        print(os.getenv('JWT_SECRET'))
        res = '{"message": "Unauthorized request"}'
        if  'JWT' in request.headers:
            token = request.headers['JWT']
            try:
                data = jwt.decode(token, os.getenv('JWT_SECRET'),algorithms=["HS256"])
                user = data['user']
                return func(*args, **kwargs, user=user)
            except Exception as e:
                print(e)
                return Response(response=res, mimetype='application/json', status=401)
        else:
            return Response(response='{"message": "No token provided."}', mimetype='application/json', status=401)

    return decorated_function

def default_handler(encoded_span):
    body = encoded_span

    app.logger.debug("body %s", body)

    return requests.post(
        "http://zipkin-server:9411/api/v2/spans",
        data=body,
        headers={'Content-Type': 'application/json'},
    )


@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

@zipkin_client_span(service_name='PAYMENT-SERVICE', span_name='get_user_payment')
def trace_get():
    print('User payment requested.')

@zipkin_client_span(service_name='PAYMENT-SERVICE', span_name='update_user_payment')
def trace_update():
    print('User payment updated.')

@zipkin_client_span(service_name='PAYMENT-SERVICE', span_name='remove_user_payment')
def trace_remove():
    print('User payment removed.')

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Payment service'})

@app.route('/payment/user', methods=['GET'])
@auth_middleware
def payment(user):
    with zipkin_span(
        service_name='PAYMENT-SERVICE',
        span_name='get_user_payment',
        transport_handler=default_handler,
        port=9004,
        sample_rate=100,
        encoding=Encoding.V2_JSON
    ):
        trace_get()

    print(user)
    user_payment = UserPayment.query.filter_by(user=user).first()

    return jsonify(user_payment.plan)

@app.route('/payment/change', methods=['PUT'])
@auth_middleware
def change(user):
    with zipkin_span(
        service_name='PAYMENT-SERVICE',
        span_name='update_user_payment',
        transport_handler=default_handler,
        port=9004,
        sample_rate=100,
        encoding=Encoding.V2_JSON
    ):
        trace_update()

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
    with zipkin_span(
        service_name='PAYMENT-SERVICE',
        span_name='remove_user_payment',
        transport_handler=default_handler,
        port=9004,
        sample_rate=100,
        encoding=Encoding.V2_JSON
    ):
        trace_remove()

    user_payment = UserPayment.query.filter_by(user=user).first()

    db.session.delete(user_payment)
    db.session.commit()

    return jsonify({'message': 'User payment account deleted.'})

if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0',debug=True, port=9004)