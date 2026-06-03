import asyncio
import json
import logging
from aiokafka import AIOKafkaConsumer
from app.config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_TOPIC, KAFKA_GROUP_ID
from app.database import AsyncSessionLocal
from app.kafka.event_handlers import handle_event

logger = logging.getLogger(__name__)


async def start_consumer():
    consumer = AIOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id=KAFKA_GROUP_ID,
        auto_offset_reset="earliest",
        enable_auto_commit=True,
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
    )
    await consumer.start()
    logger.info("Kafka consumer started, listening on topic: %s", KAFKA_TOPIC)
    try:
        async for msg in consumer:
            payload = msg.value
            try:
                async with AsyncSessionLocal() as session:
                    await handle_event(session, payload)
            except Exception as exc:
                logger.error("Error handling event %s: %s", payload.get("eventType"), exc)
    except asyncio.CancelledError:
        pass
    finally:
        await consumer.stop()
        logger.info("Kafka consumer stopped")
