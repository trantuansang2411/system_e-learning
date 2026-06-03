from sqlalchemy.ext.asyncio import AsyncSession
from src.repositories.analytics_repo import AnalyticsRepo
from src.websocket.manager import manager


class AnalyticsService:

    # ─── Write side (called by Kafka event handlers) ─────────────────────────

    @staticmethod
    async def handle_view_course(db: AsyncSession, payload: dict) -> None:
        await AnalyticsRepo.insert_raw_event(db, payload)
        course_id = payload.get("courseId") or "unknown"
        course_title = payload.get("courseTitle") or ""
        await AnalyticsRepo.upsert_course_view(db, course_id, course_title)
        await AnalyticsRepo.upsert_timeseries(db, views=1)
        await db.commit()
        await manager.broadcast({"type": "view_course", "data": payload})

    @staticmethod
    async def handle_search_course(db: AsyncSession, payload: dict) -> None:
        metadata = payload.get("metadata") or {}
        keyword = (metadata.get("keyword") or "").strip().lower()
        if not keyword:
            return
        await AnalyticsRepo.insert_raw_event(db, payload, search_keyword=keyword)
        await AnalyticsRepo.upsert_search_stat(db, keyword)
        await AnalyticsRepo.upsert_timeseries(db, searches=1)
        await db.commit()
        await manager.broadcast({"type": "search_course", "data": payload})

    @staticmethod
    async def handle_add_to_cart(db: AsyncSession, payload: dict) -> None:
        await AnalyticsRepo.insert_raw_event(db, payload)
        await AnalyticsRepo.upsert_timeseries(db, cart_adds=1)
        await db.commit()
        await manager.broadcast({"type": "add_to_cart", "data": payload})

    @staticmethod
    async def handle_payment_success(db: AsyncSession, payload: dict) -> None:
        metadata = payload.get("metadata") or {}
        amount = float(metadata.get("amount") or 0)
        await AnalyticsRepo.insert_raw_event(db, payload, amount=amount)
        await db.commit()
        await manager.broadcast({"type": "payment_success", "data": payload})

    @staticmethod
    async def handle_course_revenue(db: AsyncSession, payload: dict) -> None:
        metadata = payload.get("metadata") or {}
        amount = float(metadata.get("amount") or payload.get("amount") or 0)
        course_id = payload.get("courseId") or "unknown"
        course_title = payload.get("courseTitle") or ""
        if amount <= 0 or course_id == "unknown":
            return
        await AnalyticsRepo.insert_raw_event(db, payload, amount=amount)
        await AnalyticsRepo.upsert_course_revenue(db, course_id, course_title, amount)
        await AnalyticsRepo.upsert_daily_revenue(db, amount)
        await AnalyticsRepo.upsert_timeseries(db, purchases=1, revenue=amount)
        await db.commit()
        await manager.broadcast({"type": "course_revenue", "data": payload})

    @staticmethod
    async def handle_enroll_course(db: AsyncSession, payload: dict) -> None:
        course_id = payload.get("courseId") or "unknown"
        course_title = payload.get("courseTitle") or ""
        if course_id == "unknown":
            return
        await AnalyticsRepo.insert_raw_event(db, payload)
        await AnalyticsRepo.upsert_enrollment_stat(db, course_id, course_title)
        await db.commit()
        await manager.broadcast({"type": "enroll_course", "data": payload})

    @staticmethod
    async def handle_complete_course(db: AsyncSession, payload: dict) -> None:
        await AnalyticsRepo.insert_raw_event(db, payload)
        course_id = payload.get("courseId") or "unknown"
        course_title = payload.get("courseTitle") or ""
        await AnalyticsRepo.upsert_completion_stat(db, course_id, course_title)
        await db.commit()
        await manager.broadcast({"type": "complete_course", "data": payload})

    # ─── Read side (called by controllers) ───────────────────────────────────

    @staticmethod
    async def get_stats(db: AsyncSession) -> dict:
        return await AnalyticsRepo.get_summary_stats(db)

    @staticmethod
    async def get_top_courses(db: AsyncSession, limit: int) -> list:
        return await AnalyticsRepo.get_top_courses(db, limit)

    @staticmethod
    async def get_top_searches(db: AsyncSession, limit: int) -> list:
        return await AnalyticsRepo.get_top_searches(db, limit)

    @staticmethod
    async def get_revenue(db: AsyncSession) -> dict:
        return await AnalyticsRepo.get_revenue(db)

    @staticmethod
    async def get_completions(db: AsyncSession) -> list:
        return await AnalyticsRepo.get_completions(db)

    @staticmethod
    async def get_search_by_hour(db: AsyncSession) -> list:
        return await AnalyticsRepo.get_search_by_hour(db)

    @staticmethod
    async def get_funnel(db: AsyncSession, limit: int) -> list:
        return await AnalyticsRepo.get_funnel(db, limit)

    @staticmethod
    async def get_views_per_day(db: AsyncSession, days: int = 7) -> list:
        return await AnalyticsRepo.get_views_per_day(db, days)

    @staticmethod
    async def get_revenue_by_course(db: AsyncSession) -> list:
        return await AnalyticsRepo.get_revenue_by_course(db)

    @staticmethod
    async def get_enrollment_stats(db: AsyncSession) -> list:
        return await AnalyticsRepo.get_enrollment_stats(db)

    @staticmethod
    async def get_timeseries(db: AsyncSession, range_key: str) -> dict:
        return await AnalyticsRepo.get_timeseries(db, range_key)
