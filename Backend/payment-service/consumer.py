import pika, json

from app import UserPayment, db

params = pika.URLParameters('amqp://localhost')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='payments')

def callback(ch, method, properties, body):
    print('Recieved payment info')

    data = json.loads(body)

    user_payment = UserPayment(user=data['user'], plan=data['plan'], last_modified=data['last_modified'])

    db.session.add(user_payment)
    db.session.commit()

channel.basic_consume(queue='payments', on_message_callback=callback, auto_ack=True)

print('Started consuming')

channel.start_consuming()

channel.close()
