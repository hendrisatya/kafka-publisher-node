import { Kafka, Partitioners } from 'kafkajs';
import { kafkaConfig } from '../config/kafkaConfig.js';

const kafka = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: kafkaConfig.brokers,
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
let isConnected = false;

const connectProducer = async () => {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log(`Kafka Service connected to: ${kafkaConfig.brokers.join(', ')}`);
  }
};

export const publishToKafka = async (topic, payload) => {
  await connectProducer();

  try {
    const record = await producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
    console.log(`Service: Published to ${topic}`);
    return record;
  } catch (error) {
    console.error('Service Error:', error);
    throw error;
  }
};

export const disconnectProducer = async () => {
  if (isConnected) {
    await producer.disconnect();
    isConnected = false;
    console.log('Kafka Service disconnected');
  }
};