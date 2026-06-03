const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

let producer = null;
const TOPIC = process.env.KAFKA_TOPIC || 'user-behavior-events';

async function connect(brokers) {
    try {
        const brokerList = Array.isArray(brokers) ? brokers : [brokers];
        const kafka = new Kafka({
            clientId: process.env.npm_package_name || 'analytics-producer',
            brokers: brokerList,
            retry: { retries: 5, initialRetryTime: 300 },
        });
        producer = kafka.producer();
        await producer.connect();
        logger.info('Kafka analytics producer connected to %s', brokerList.join(','));
    } catch (err) {
        logger.warn('Kafka analytics producer failed to connect: %s', err.message);
        producer = null;
    }
}

async function publishAnalyticsEvent(eventType, payload) {
    if (!producer) {
        logger.warn('Kafka producer not initialized, skipping event: %s', eventType);
        return;
    }
    try {
        const message = {
            eventId: uuidv4(),
            eventType,
            userId: payload.userId || null,
            courseId: payload.courseId || null,
            courseTitle: payload.courseTitle || null,
            metadata: payload.metadata || null,
            timestamp: new Date().toISOString(),
        };
        await producer.send({
            topic: TOPIC,
            messages: [{ key: eventType, value: JSON.stringify(message) }],
        });
        logger.info('Analytics event published: %s', eventType);
    } catch (err) {
        logger.warn('Failed to publish analytics event %s: %s', eventType, err.message);
    }
}

async function disconnect() {
    if (producer) {
        try {
            await producer.disconnect();
            logger.info('Kafka analytics producer disconnected');
        } catch (err) {
            logger.warn('Error disconnecting Kafka producer: %s', err.message);
        }
        producer = null;
    }
}

module.exports = { connect, publishAnalyticsEvent, disconnect };
