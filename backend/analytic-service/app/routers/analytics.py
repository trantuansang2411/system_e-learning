from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import get_db

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    total_views = (await db.execute(
        text("SELECT COALESCE(SUM(view_count), 0) FROM course_view_stats")
    )).scalar()

    total_searches = (await db.execute(
        text("SELECT COALESCE(SUM(search_count), 0) FROM search_stats")
    )).scalar()

    total_cart_adds = (await db.execute(
        text("SELECT COUNT(*) FROM user_events WHERE event_type = 'add_to_cart'")
    )).scalar()

    total_revenue = (await db.execute(
        text("SELECT COALESCE(SUM(total_revenue), 0) FROM daily_revenue")
    )).scalar()

    courses_completed = (await db.execute(
        text("SELECT COALESCE(SUM(completion_count), 0) FROM completion_stats")
    )).scalar()

    return {
        "total_views": int(total_views),
        "total_searches": int(total_searches),
        "total_cart_adds": int(total_cart_adds),
        "total_revenue": float(total_revenue),
        "courses_completed": int(courses_completed),
    }


@router.get("/top-courses")
async def get_top_courses(limit: int = 5, db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(
        text("SELECT course_id, course_title, view_count FROM course_view_stats ORDER BY view_count DESC LIMIT :limit"),
        {"limit": limit}
    )).fetchall()
    return [{"course_id": r[0], "course_title": r[1], "view_count": r[2]} for r in rows]


@router.get("/top-searches")
async def get_top_searches(limit: int = 5, db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(
        text("""
            SELECT keyword, SUM(search_count) as total
            FROM search_stats
            GROUP BY keyword
            ORDER BY total DESC
            LIMIT :limit
        """),
        {"limit": limit}
    )).fetchall()
    return [{"keyword": r[0], "search_count": int(r[1])} for r in rows]


@router.get("/revenue")
async def get_revenue(db: AsyncSession = Depends(get_db)):
    today = (await db.execute(
        text("SELECT COALESCE(total_revenue, 0), COALESCE(purchase_count, 0) FROM daily_revenue WHERE date = CURRENT_DATE")
    )).fetchone()

    totals = (await db.execute(
        text("SELECT COALESCE(SUM(total_revenue), 0), COALESCE(SUM(purchase_count), 0) FROM daily_revenue")
    )).fetchone()

    return {
        "today_revenue": float(today[0]) if today else 0,
        "today_purchases": int(today[1]) if today else 0,
        "total_revenue": float(totals[0]) if totals else 0,
        "total_purchases": int(totals[1]) if totals else 0,
    }


@router.get("/completions")
async def get_completions(db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(
        text("SELECT course_id, course_title, completion_count FROM completion_stats ORDER BY completion_count DESC")
    )).fetchall()
    return [{"course_id": r[0], "course_title": r[1], "completion_count": r[2]} for r in rows]


@router.get("/search-by-hour")
async def get_search_by_hour(db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(
        text("""
            SELECT keyword, hour, search_count
            FROM search_stats
            WHERE hour >= NOW() - INTERVAL '24 hours'
            ORDER BY hour DESC, search_count DESC
        """)
    )).fetchall()
    return [{"keyword": r[0], "hour": r[1].isoformat(), "count": r[2]} for r in rows]
