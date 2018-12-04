const amqp = require('amqplib');

(async () => {
    try {
        let establishConnection = await amqp.connect(); // pass in the rabbit mq connection url in the connect() method to establish a connection example: amqp://localhost
        let newChannel = await establishConnection.createChannel();
        let q = 'hello';
        let addQueue = newChannel.assertQueue(q, {
            durable: false
        });
          let send = newChannel.sendToQueue(q,Buffer.from('Hello world from ugi'));
        console.log(`Sent to queue`);
        setTimeout(() => {
            establishConnection.close();
            process.exit(0)
        }, 500);
    } catch (e) {
        console.log(e);
    }
})();
