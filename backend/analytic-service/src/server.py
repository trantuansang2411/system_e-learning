import asyncio
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.database import create_tables
from src.events.kafka_consumer import start_consumer
from src.routes.analytics_routes import router as analytics_router
from src.routes.ws_routes import router as ws_router

logger = logging.getLogger(__name__)

_consumer_task: asyncio.Task | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _consumer_task
    logger.info("Analytic service starting...")
    await create_tables()
    logger.info("Database tables ready")
    _consumer_task = asyncio.create_task(start_consumer())
    logger.info("Kafka consumer task started")
    yield
    if _consumer_task:
        _consumer_task.cancel()
        try:
            await _consumer_task
        except asyncio.CancelledError:
            pass
    logger.info("Analytic service stopped")


def create_app() -> FastAPI:
    app = FastAPI(
        title="Analytic Service",
        version="1.0.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(analytics_router, prefix="/api/v1")
    app.include_router(ws_router, prefix="/api/v1/analytics")

    @app.get("/health", tags=["health"])
    def health():
        return {"status": "ok", "service": "analytic-service"}

    return app
