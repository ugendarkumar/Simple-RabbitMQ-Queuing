const amqp = require('amqplib');

(async () => {
    try {
        let establishConnection = await amqp.connect();// pass in the rabbit mq connection url in the connect() method to establish a connection example: amqp://localhost
        let newChannel = await establishConnection.createChannel();
        let q = 'hello';
        let addQueue = newChannel.assertQueue(q, {
            durable: false
        });
     let receiveMessage = await new Promise((resolve,reject) => {
        newChannel.consume(q,function(msg){
        resolve(msg)
      },{noAck: true})});
      console.log(receiveMessage.content.toString());
        setTimeout(() => {
            establishConnection.close();
            process.exit(0)
        }, 500);
    } catch (e) {
        console.log(e);
    }
})();