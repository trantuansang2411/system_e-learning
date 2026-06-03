from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.websocket.manager import manager
import uuid


async def handle_event(session: AsyncSession, payload: dict):
    event_type = payload.get("eventType", "")
    handlers = {
        "view_course": _handle_view_course,
        "search_course": _handle_search_course,
        "add_to_cart": _handle_add_to_cart,
        "payment_success": _handle_payment_success,
        "complete_course": _handle_complete_course,
    }
    handler = handlers.get(event_type)
    if handler:
        await handler(session, payload)
        await session.commit()
        await manager.broadcast({"type": event_type, "data": payload})


async def _insert_raw_event(session: AsyncSession, payload: dict, **extra):
    metadata = payload.get("metadata") or {}
    await session.execute(
        text("""
            INSERT INTO user_events (event_id, event_type, user_id, course_id, course_title,
                search_keyword, amount, metadata, created_at)
            VALUES (:event_id, :event_type, :user_id, :course_id, :course_title,
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
            "metadata": str(metadata) if metadata else None,
        }
    )


async def _handle_view_course(session: AsyncSession, payload: dict):
    await _insert_raw_event(session, payload)
    course_id = payload.get("courseId") or "unknown"
    course_title = payload.get("courseTitle") or ""
    await session.execute(
        text("""
            INSERT INTO course_view_stats (course_id, course_title, view_count, last_updated)
            VALUES (:course_id, :course_title, 1, NOW())
            ON CONFLICT (course_id) DO UPDATE
            SET view_count = course_view_stats.view_count + 1,
                course_title = EXCLUDED.course_title,
                last_updated = NOW()
        """),
        {"course_id": course_id, "course_title": course_title}
    )


async def _handle_search_course(session: AsyncSession, payload: dict):
    metadata = payload.get("metadata") or {}
    keyword = (metadata.get("keyword") or "").strip().lower()
    if not keyword:
        return
    await _insert_raw_event(session, payload, search_keyword=keyword)
    await session.execute(
        text("""
            INSERT INTO search_stats (keyword, hour, search_count)
            VALUES (:keyword, date_trunc('hour', NOW()), 1)
            ON CONFLICT (keyword, hour) DO UPDATE
            SET search_count = search_stats.search_count + 1
        """),
        {"keyword": keyword}
    )


async def _handle_add_to_cart(session: AsyncSession, payload: dict):
    await _insert_raw_event(session, payload)


async def _handle_payment_success(session: AsyncSession, payload: dict):
    metadata = payload.get("metadata") or {}
    amount = float(metadata.get("amount") or 0)
    await _insert_raw_event(session, payload, amount=amount)
    await session.execute(
        text("""
            INSERT INTO daily_revenue (date, total_revenue, purchase_count)
            VALUES (CURRENT_DATE, :amount, 1)
            ON CONFLICT (date) DO UPDATE
            SET total_revenue = daily_revenue.total_revenue + :amount,
                purchase_count = daily_revenue.purchase_count + 1
        """),
        {"amount": amount}
    )


async def _handle_complete_course(session: AsyncSession, payload: dict):
    await _insert_raw_event(session, payload)
    course_id = payload.get("courseId") or "unknown"
    course_title = payload.get("courseTitle") or ""
    await session.execute(
        text("""
            INSERT INTO completion_stats (course_id, course_title, completion_count)
            VALUES (:course_id, :course_title, 1)
            ON CONFLICT (course_id) DO UPDATE
            SET completion_count = completion_stats.completion_count + 1,
                course_title = EXCLUDED.course_title
        """),
        {"course_id": course_id, "course_title": course_title}
    )
