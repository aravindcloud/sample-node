"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.getConnection = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'skylab',
    brokers: ['142.147.1.153:9092']
});
const producer = kafka.producer();
function getConnection(user) {
    return producer.connect().then(() => {
        return (message) => {
            return producer.send({
                topic: 'user.email.verify',
                messages: [
                    { value: JSON.stringify({ message, user }) },
                ],
            });
        };
    });
}
exports.getConnection = getConnection;
function disconnect() {
    return producer.disconnect();
}
exports.disconnect = disconnect;
