import logging
from sqlalchemy.ext.asyncio import AsyncSession
from src.services.analytics_service import AnalyticsService

logger = logging.getLogger(__name__)

_HANDLERS = {
    "view_course":      AnalyticsService.handle_view_course,
    "search_course":    AnalyticsService.handle_search_course,
    "add_to_cart":      AnalyticsService.handle_add_to_cart,
    "payment_success":  AnalyticsService.handle_payment_success,
    "complete_course":  AnalyticsService.handle_complete_course,
    "course_revenue":   AnalyticsService.handle_course_revenue,
    "enroll_course":    AnalyticsService.handle_enroll_course,
}


async def handle_event(db: AsyncSession, payload: dict) -> None:
    event_type = payload.get("eventType", "")
    handler = _HANDLERS.get(event_type)
    if handler:
        await handler(db, payload)
    else:
        logger.debug("Unknown event type received: %s", event_type)
