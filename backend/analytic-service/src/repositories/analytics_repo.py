from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import uuid
import json


class AnalyticsRepo:

    @staticmethod
    async def insert_raw_event(db: AsyncSession, payload: dict, **extra) -> None:
        metadata = payload.get("metadata") or {}
        await db.execute(
            text("""
                INSERT INTO user_events
                    (event_id, event_type, user_id, course_id, course_title,
                     search_keyword, amount, metadata, created_at)
                VALUES
                    (:event_id, :event_type, :user_id, :course_id, :course_title,
                     :search_keyword, :amount, :metadata, NOW())
                ON CONFLICT (event_id) DO NOTHING
            """),
            {
                "event_id": payload.get("eventId") or str(uuid.uuid4()),
                "event_type": payload.get("eventType"),
                "user_id": payload.get("userId"),
                "course_id": payload.get("courseId"),
                "course_title": payload.get("courseTitle"),
                "search_keyword": extra.get("search_keyword"),
                "amount": extra.get("amount"),
                "metadata": json.dumps(metadata) if metadata else None,
            },
        )

    @staticmethod
    async def upsert_course_view(db: AsyncSession, course_id: str, course_title: str) -> None:
        await db.execute(
            text("""
                INSERT INTO course_view_stats (course_id, course_title, view_count, last_updated)
                VALUES (:course_id, :course_title, 1, NOW())
                ON CONFLICT (course_id) DO UPDATE
                SET view_count    = course_view_stats.view_count + 1,
                    course_title  = EXCLUDED.course_title,
                    last_updated  = NOW()
            """),
            {"course_id": course_id, "course_title": course_title},
        )

    @staticmethod
    async def upsert_search_stat(db: AsyncSession, keyword: str) -> None:
        await db.execute(
            text("""
                INSERT INTO search_stats (keyword, hour, search_count)
                VALUES (:keyword, date_trunc('hour', NOW()), 1)
                ON CONFLICT (keyword, hour) DO UPDATE
                SET search_count = search_stats.search_count + 1
            """),
            {"keyword": keyword},
        )

    @staticmethod
    async def upsert_daily_revenue(db: AsyncSession, amount: float) -> None:
        await db.execute(
            text("""
                INSERT INTO daily_revenue (date, total_revenue, purchase_count)
                VALUES (CURRENT_DATE, :amount, 1)
                ON CONFLICT (date) DO UPDATE
                SET total_revenue  = daily_revenue.total_revenue + :amount,
                    purchase_count = daily_revenue.purchase_count + 1
            """),
            {"amount": amount},
        )

    @staticmethod
    async def upsert_completion_stat(db: AsyncSession, course_id: str, course_title: str) -> None:
        await db.execute(
            text("""
                INSERT INTO completion_stats (course_id, course_title, completion_count)
                VALUES (:course_id, :course_title, 1)
                ON CONFLICT (course_id) DO UPDATE
                SET completion_count = completion_stats.completion_count + 1,
                    course_title     = EXCLUDED.course_title
            """),
            {"course_id": course_id, "course_title": course_title},
        )

    @staticmethod
    async def upsert_timeseries(
        db: AsyncSession,
        *,
        views: int = 0,
        searches: int = 0,
        cart_adds: int = 0,
        purchases: int = 0,
        revenue: float = 0,
    ) -> None:
        await db.execute(
            text("""
                INSERT INTO daily_stats
                    (stat_date, total_views, total_searches, total_cart_adds, total_purchases, total_revenue)
                VALUES
                    (CURRENT_DATE, :v, :s, :c, :p, :r)
                ON CONFLICT (stat_date) DO UPDATE
                SET total_views     = daily_stats.total_views     + :v,
                    total_searches  = daily_stats.total_searches  + :s,
                    total_cart_adds = daily_stats.total_cart_adds + :c,
                    total_purchases = daily_stats.total_purchases + :p,
                    total_revenue   = daily_stats.total_revenue   + :r
            """),
            {"v": views, "s": searches, "c": cart_adds, "p": purchases, "r": revenue},
        )
        await db.execute(
            text("""
                INSERT INTO hourly_stats
                    (stat_date, stat_hour, total_views, total_searches, total_cart_adds, total_purchases, total_revenue)
                VALUES
                    (CURRENT_DATE, EXTRACT(HOUR FROM NOW()), :v, :s, :c, :p, :r)
                ON CONFLICT (stat_date, stat_hour) DO UPDATE
                SET total_views     = hourly_stats.total_views     + :v,
                    total_searches  = hourly_stats.total_searches  + :s,
                    total_cart_adds = hourly_stats.total_cart_adds + :c,
                    total_purchases = hourly_stats.total_purchases + :p,
                    total_revenue   = hourly_stats.total_revenue   + :r
            """),
            {"v": views, "s": searches, "c": cart_adds, "p": purchases, "r": revenue},
        )

    @staticmethod
    async def get_timeseries(db: AsyncSession, range_key: str) -> dict:
        if range_key == "today":
            rows = (await db.execute(text("""
                SELECT stat_hour,
                       total_views, total_searches, total_cart_adds, total_purchases, total_revenue
                FROM hourly_stats
                WHERE stat_date = CURRENT_DATE
                ORDER BY stat_hour
            """))).fetchall()
            # Fill all 24 hours with zeros
            hour_map = {r[0]: r for r in rows}
            data = []
            for h in range(24):
                r = hour_map.get(h)
                data.append({
                    "label": f"{h:02d}:00",
                    "views":     int(r[1]) if r else 0,
                    "searches":  int(r[2]) if r else 0,
                    "cart_adds": int(r[3]) if r else 0,
                    "purchases": int(r[4]) if r else 0,
                    "revenue":   float(r[5]) if r else 0,
                })
            return {"range": range_key, "granularity": "hour", "data": data}

        # day-based ranges
        if range_key == "7d":
            days = 7
        elif range_key == "30d":
            days = 30
        elif range_key == "thismonth":
            days = None  # handled separately
        else:
            days = 7

        if range_key == "thismonth":
            rows = (await db.execute(text("""
                SELECT stat_date,
                       total_views, total_searches, total_cart_adds, total_purchases, total_revenue
                FROM daily_stats
                WHERE stat_date >= DATE_TRUNC('month', CURRENT_DATE)
                ORDER BY stat_date
            """))).fetchall()
            # generate all days from start of month to today
            from datetime import date, timedelta
            today = date.today()
            month_start = today.replace(day=1)
            all_days = []
            d = month_start
            while d <= today:
                all_days.append(d)
                d += timedelta(days=1)
        else:
            rows = (await db.execute(text("""
                SELECT stat_date,
                       total_views, total_searches, total_cart_adds, total_purchases, total_revenue
                FROM daily_stats
                WHERE stat_date >= CURRENT_DATE - INTERVAL '1 day' * :days
                ORDER BY stat_date
            """), {"days": days - 1})).fetchall()
            from datetime import date, timedelta
            today = date.today()
            all_days = [today - timedelta(days=i) for i in range(days - 1, -1, -1)]

        day_map = {r[0]: r for r in rows}
        data = []
        for d in all_days:
            r = day_map.get(d)
            data.append({
                "label": d.strftime("%d/%m"),
                "views":     int(r[1]) if r else 0,
                "searches":  int(r[2]) if r else 0,
                "cart_adds": int(r[3]) if r else 0,
                "purchases": int(r[4]) if r else 0,
                "revenue":   float(r[5]) if r else 0,
            })
        return {"range": range_key, "granularity": "day", "data": data}

    # ─── Read queries ────────────────────────────────────────────────────────

    @staticmethod
    async def get_summary_stats(db: AsyncSession) -> dict:
        total_views = (await db.execute(
            text("SELECT COUNT(*) FROM user_events WHERE event_type = 'view_course'")
        )).scalar()
        total_searches = (await db.execute(
            text("SELECT COUNT(*) FROM user_events WHERE event_type = 'search_course'")
        )).scalar()
        total_cart_adds = (await db.execute(
            text("SELECT COUNT(*) FROM user_events WHERE event_type = 'add_to_cart'")
        )).scalar()
        total_revenue = (await db.execute(
            text("SELECT COALESCE(SUM(total_revenue), 0) FROM course_revenue_stats")
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

    @staticmethod
    async def get_top_courses(db: AsyncSession, limit: int) -> list:
        rows = (await db.execute(
            text("""
                SELECT course_id, course_title, view_count
                FROM course_view_stats
                ORDER BY view_count DESC
                LIMIT :limit
            """),
            {"limit": limit},
        )).fetchall()
        return [{"course_id": r[0], "course_title": r[1], "view_count": r[2]} for r in rows]

    @staticmethod
    async def get_top_searches(db: AsyncSession, limit: int) -> list:
        rows = (await db.execute(
            text("""
                SELECT keyword, SUM(search_count) AS total
                FROM search_stats
                GROUP BY keyword
                ORDER BY total DESC
                LIMIT :limit
            """),
            {"limit": limit},
        )).fetchall()
        return [{"keyword": r[0], "search_count": int(r[1])} for r in rows]

    @staticmethod
    async def get_revenue(db: AsyncSession) -> dict:
        # today: from user_events (raw, always accurate for current day)
        today = (await db.execute(
            text("""
                SELECT COALESCE(SUM(amount), 0), COUNT(*)
                FROM user_events
                WHERE event_type = 'course_revenue'
                  AND DATE(created_at) = CURRENT_DATE
            """)
        )).fetchone()
        # total: from course_revenue_stats (same source as revenue-by-course table)
        totals = (await db.execute(
            text("""
                SELECT COALESCE(SUM(total_revenue), 0), COALESCE(SUM(purchase_count), 0)
                FROM course_revenue_stats
            """)
        )).fetchone()
        return {
            "today_revenue": float(today[0]) if today else 0,
            "today_purchases": int(today[1]) if today else 0,
            "total_revenue": float(totals[0]) if totals else 0,
            "total_purchases": int(totals[1]) if totals else 0,
        }

    @staticmethod
    async def get_completions(db: AsyncSession) -> list:
        rows = (await db.execute(
            text("""
                SELECT course_id, course_title, completion_count
                FROM completion_stats
                ORDER BY completion_count DESC
            """)
        )).fetchall()
        return [{"course_id": r[0], "course_title": r[1], "completion_count": r[2]} for r in rows]

    @staticmethod
    async def upsert_course_revenue(db: AsyncSession, course_id: str, course_title: str, amount: float) -> None:
        await db.execute(
            text("""
                INSERT INTO course_revenue_stats (course_id, course_title, total_revenue, purchase_count)
                VALUES (:course_id, :course_title, :amount, 1)
                ON CONFLICT (course_id) DO UPDATE
                SET total_revenue  = course_revenue_stats.total_revenue + :amount,
                    purchase_count = course_revenue_stats.purchase_count + 1,
                    course_title   = EXCLUDED.course_title
            """),
            {"course_id": course_id, "course_title": course_title, "amount": amount},
        )

    @staticmethod
    async def upsert_enrollment_stat(db: AsyncSession, course_id: str, course_title: str) -> None:
        await db.execute(
            text("""
                INSERT INTO enrollment_stats (course_id, course_title, enrollment_count)
                VALUES (:course_id, :course_title, 1)
                ON CONFLICT (course_id) DO UPDATE
                SET enrollment_count = enrollment_stats.enrollment_count + 1,
                    course_title     = EXCLUDED.course_title
            """),
            {"course_id": course_id, "course_title": course_title},
        )

    @staticmethod
    async def get_funnel(db: AsyncSession, limit: int) -> list:
        rows = (await db.execute(
            text("""
                SELECT
                    cvs.course_id,
                    cvs.course_title,
                    cvs.view_count,
                    COALESCE(cart.cart_count, 0)  AS cart_adds,
                    COALESCE(rev.purchase_count, 0) AS purchases
                FROM course_view_stats cvs
                LEFT JOIN (
                    SELECT course_id, COUNT(*) AS cart_count
                    FROM user_events
                    WHERE event_type = 'add_to_cart'
                    GROUP BY course_id
                ) cart ON cvs.course_id = cart.course_id
                LEFT JOIN course_revenue_stats rev ON cvs.course_id = rev.course_id
                ORDER BY cvs.view_count DESC
                LIMIT :limit
            """),
            {"limit": limit},
        )).fetchall()
        return [
            {
                "course_id": r[0],
                "course_title": r[1] or r[0],
                "views": int(r[2]),
                "cart_adds": int(r[3]),
                "purchases": int(r[4]),
                "view_to_cart_rate": min(100.0, round(int(r[3]) / int(r[2]) * 100, 1)) if int(r[2]) > 0 else 0,
                "cart_to_purchase_rate": min(100.0, round(int(r[4]) / int(r[3]) * 100, 1)) if int(r[3]) > 0 else 0,
                "overall_conversion": min(100.0, round(int(r[4]) / int(r[2]) * 100, 1)) if int(r[2]) > 0 else 0,
            }
            for r in rows
        ]

    @staticmethod
    async def get_views_per_day(db: AsyncSession, days: int) -> list:
        rows = (await db.execute(
            text("""
                SELECT DATE(created_at) AS day, COUNT(*) AS view_count
                FROM user_events
                WHERE event_type = 'view_course'
                  AND created_at >= NOW() - INTERVAL '1 day' * :days
                GROUP BY DATE(created_at)
                ORDER BY day
            """),
            {"days": days},
        )).fetchall()
        return [{"day": str(r[0]), "views": int(r[1])} for r in rows]

    @staticmethod
    async def get_revenue_by_course(db: AsyncSession) -> list:
        rows = (await db.execute(
            text("""
                SELECT course_id, course_title, total_revenue, purchase_count
                FROM course_revenue_stats
                ORDER BY total_revenue DESC
            """)
        )).fetchall()
        return [
            {
                "course_id": r[0],
                "course_title": r[1] or r[0],
                "total_revenue": float(r[2]),
                "purchase_count": int(r[3]),
            }
            for r in rows
        ]

    @staticmethod
    async def get_enrollment_stats(db: AsyncSession) -> list:
        rows = (await db.execute(
            text("""
                SELECT
                    es.course_id,
                    es.course_title,
                    es.enrollment_count,
                    COALESCE(cs.completion_count, 0) AS completion_count
                FROM enrollment_stats es
                LEFT JOIN completion_stats cs ON es.course_id = cs.course_id
                ORDER BY es.enrollment_count DESC
            """)
        )).fetchall()
        return [
            {
                "course_id": r[0],
                "course_title": r[1] or r[0],
                "enrollment_count": int(r[2]),
                "completion_count": int(r[3]),
                "completion_rate": round(int(r[3]) / int(r[2]) * 100, 1) if int(r[2]) > 0 else 0,
            }
            for r in rows
        ]

    @staticmethod
    async def get_search_by_hour(db: AsyncSession) -> list:
        rows = (await db.execute(
            text("""
                SELECT keyword, hour, search_count
                FROM search_stats
                WHERE hour >= NOW() - INTERVAL '24 hours'
                ORDER BY hour DESC, search_count DESC
            """)
        )).fetchall()
        return [{"keyword": r[0], "hour": r[1].isoformat(), "count": r[2]} for r in rows]
