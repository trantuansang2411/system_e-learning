from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database.database import get_db
from src.controllers.analytics_controller import AnalyticsController

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_stats(db)


@router.get("/top-courses")
async def get_top_courses(limit: int = 5, db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_top_courses(db, limit)


@router.get("/top-searches")
async def get_top_searches(limit: int = 5, db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_top_searches(db, limit)


@router.get("/revenue")
async def get_revenue(db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_revenue(db)


@router.get("/completions")
async def get_completions(db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_completions(db)


@router.get("/search-by-hour")
async def get_search_by_hour(db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_search_by_hour(db)


@router.get("/funnel")
async def get_funnel(limit: int = 8, db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_funnel(db, limit)


@router.get("/views-per-day")
async def get_views_per_day(days: int = 7, db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_views_per_day(db, days)


@router.get("/revenue-by-course")
async def get_revenue_by_course(db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_revenue_by_course(db)


@router.get("/enrollment-stats")
async def get_enrollment_stats(db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_enrollment_stats(db)


@router.get("/timeseries")
async def get_timeseries(range: str = "7d", db: AsyncSession = Depends(get_db)):
    return await AnalyticsController.get_timeseries(db, range)
