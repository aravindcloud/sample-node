import { v4 as uuidv4 } from 'uuid';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'skylab',
    brokers: ['142.147.1.153:9092']
});

const consumer = kafka.consumer({ groupId: uuidv4() }); // we need a unique groupId I'll explain down

export function connect() {
    return consumer.connect().then(() =>
        consumer.subscribe({ topic: 'user.email.verify' }).then(() =>
            consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const formattedValue = JSON.parse((message.value as Buffer).toString()); // everything comes as a buffer
                    console.log(`${formattedValue.user}: ${formattedValue.message}`)// print the message
                },
            })
        )
    );
}

export function disconnect() {
    consumer.disconnect();
}