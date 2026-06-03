from sqlalchemy.ext.asyncio import AsyncSession
from src.services.analytics_service import AnalyticsService


class AnalyticsController:

    @staticmethod
    async def get_stats(db: AsyncSession) -> dict:
        return await AnalyticsService.get_stats(db)

    @staticmethod
    async def get_top_courses(db: AsyncSession, limit: int) -> list:
        return await AnalyticsService.get_top_courses(db, limit)

    @staticmethod
    async def get_top_searches(db: AsyncSession, limit: int) -> list:
        return await AnalyticsService.get_top_searches(db, limit)

    @staticmethod
    async def get_revenue(db: AsyncSession) -> dict:
        return await AnalyticsService.get_revenue(db)

    @staticmethod
    async def get_completions(db: AsyncSession) -> list:
        return await AnalyticsService.get_completions(db)

    @staticmethod
    async def get_search_by_hour(db: AsyncSession) -> list:
        return await AnalyticsService.get_search_by_hour(db)

    @staticmethod
    async def get_funnel(db: AsyncSession, limit: int) -> list:
        return await AnalyticsService.get_funnel(db, limit)

    @staticmethod
    async def get_views_per_day(db: AsyncSession, days: int) -> list:
        return await AnalyticsService.get_views_per_day(db, days)

    @staticmethod
    async def get_revenue_by_course(db: AsyncSession) -> list:
        return await AnalyticsService.get_revenue_by_course(db)

    @staticmethod
    async def get_enrollment_stats(db: AsyncSession) -> list:
        return await AnalyticsService.get_enrollment_stats(db)

    @staticmethod
    async def get_timeseries(db: AsyncSession, range_key: str) -> dict:
        return await AnalyticsService.get_timeseries(db, range_key)
