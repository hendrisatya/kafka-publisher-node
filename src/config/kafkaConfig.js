import dotenv from 'dotenv';
dotenv.config();

export const kafkaConfig = {
    clientId: 'my-app-publisher',
    brokers: process.env.KAFKA_BROKERS
        ? process.env.KAFKA_BROKERS.split(',').map(b => b.trim())
        : ['localhost:9092']
};