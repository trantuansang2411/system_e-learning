import asyncio
import json
import logging
from aiokafka import AIOKafkaConsumer
from src.config import KAFKA_BOOTSTRAP_SERVERS, KAFKA_TOPIC, KAFKA_GROUP_ID
from src.database.database import AsyncSessionLocal
from src.events.event_handlers import handle_event

logger = logging.getLogger(__name__)

_RETRY_DELAY_SECONDS = 5


async def _run_consumer() -> None:
    consumer = AIOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id=KAFKA_GROUP_ID,
        auto_offset_reset="earliest",
        enable_auto_commit=True,
        value_deserializer=lambda m: json.loads(m.decode("utf-8-sig")),
    )
    await consumer.start()
    logger.info("Kafka consumer started — topic: %s", KAFKA_TOPIC)
    try:
        async for msg in consumer:
            payload = msg.value
            try:
                async with AsyncSessionLocal() as db:
                    await handle_event(db, payload)
            except Exception as exc:
                logger.error(
                    "Error handling event [%s]: %s",
                    payload.get("eventType", "unknown") if isinstance(payload, dict) else "unknown",
                    exc,
                )
    finally:
        await consumer.stop()
        logger.info("Kafka consumer stopped")


async def start_consumer() -> None:
    while True:
        try:
            await _run_consumer()
        except asyncio.CancelledError:
            break
        except Exception as exc:
            logger.error("Kafka consumer crashed: %s — restarting in %ds", exc, _RETRY_DELAY_SECONDS)
            await asyncio.sleep(_RETRY_DELAY_SECONDS)
