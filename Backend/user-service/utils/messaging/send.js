var ampq = require('amqplib/callback_api');

function send(info) {
        ampq.connect('amqp://localhost', (error0, connection) => {
        if(error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if(error1) {
                throw error1;
            }

            var queue = 'payments'

            channel.assertQueue(queue, {
                durable: false
            })

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(info)))

            console.log("Payment info sent");
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    })
}

module.exports = send;