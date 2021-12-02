"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const uuid_1 = require("uuid");
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'skylab',
    brokers: ['142.147.1.153:9092']
});
const consumer = kafka.consumer({ groupId: (0, uuid_1.v4)() }); // we need a unique groupId I'll explain down
function connect() {
    return consumer.connect().then(() => consumer.subscribe({ topic: 'user.email.verify' }).then(() => consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
            const formattedValue = JSON.parse(message.value.toString()); // everything comes as a buffer
            console.log(`${formattedValue.user}: ${formattedValue.message}`); // print the message
        }),
    })));
}
exports.connect = connect;
function disconnect() {
    consumer.disconnect();
}
exports.disconnect = disconnect;
