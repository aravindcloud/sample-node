import {Kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'skylab',
  brokers: ['142.147.1.153:9092']
});

const producer = kafka.producer();

export function getConnection(user: string){
  return producer.connect().then(() => {
    return (message: string) => {
      return producer.send({
        topic: 'user.email.verify', // the topic created before
        messages: [//we send the message and the user who sent it
          {value: JSON.stringify({message, user})},
        ],
      })
    }
  })
}

export function disconnect(){
  return producer.disconnect()
}