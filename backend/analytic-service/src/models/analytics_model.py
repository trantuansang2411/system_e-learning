from sqlalchemy import Column, Integer, String, DateTime, Numeric, Date, JSON, text
from sqlalchemy.dialects.postgresql import UUID
from src.database.database import Base
import uuid


class UserEvent(Base):
    __tablename__ = "user_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(UUID(as_uuid=True), unique=True, default=uuid.uuid4)
    event_type = Column(String(50), nullable=False)
    user_id = Column(String(255), nullable=True)
    course_id = Column(String(255), nullable=True)
    course_title = Column(String(500), nullable=True)
    search_keyword = Column(String(255), nullable=True)
    amount = Column(Numeric(10, 2), nullable=True)
    event_metadata = Column("metadata", JSON, nullable=True)
    created_at = Column(DateTime, server_default=text("NOW()"))


class CourseViewStat(Base):
    __tablename__ = "course_view_stats"

    course_id = Column(String(255), primary_key=True)
    course_title = Column(String(500), nullable=True)
    view_count = Column(Integer, default=0)
    last_updated = Column(DateTime, server_default=text("NOW()"))


class SearchStat(Base):
    __tablename__ = "search_stats"

    keyword = Column(String(255), primary_key=True)
    hour = Column(DateTime, primary_key=True)
    search_count = Column(Integer, default=0)


class DailyRevenue(Base):
    __tablename__ = "daily_revenue"

    date = Column(Date, primary_key=True)
    total_revenue = Column(Numeric(10, 2), default=0)
    purchase_count = Column(Integer, default=0)


class CompletionStat(Base):
    __tablename__ = "completion_stats"

    course_id = Column(String(255), primary_key=True)
    course_title = Column(String(500), nullable=True)
    completion_count = Column(Integer, default=0)


class CourseRevenueStat(Base):
    __tablename__ = "course_revenue_stats"

    course_id = Column(String(255), primary_key=True)
    course_title = Column(String(500), nullable=True)
    total_revenue = Column(Numeric(10, 2), default=0)
    purchase_count = Column(Integer, default=0)


class EnrollmentStat(Base):
    __tablename__ = "enrollment_stats"

    course_id = Column(String(255), primary_key=True)
    course_title = Column(String(500), nullable=True)
    enrollment_count = Column(Integer, default=0)


class DailyStat(Base):
    __tablename__ = "daily_stats"

    stat_date = Column(Date, primary_key=True)
    total_views = Column(Integer, default=0)
    total_searches = Column(Integer, default=0)
    total_cart_adds = Column(Integer, default=0)
    total_purchases = Column(Integer, default=0)
    total_revenue = Column(Numeric(12, 2), default=0)


class HourlyStat(Base):
    __tablename__ = "hourly_stats"

    stat_date = Column(Date, primary_key=True)
    stat_hour = Column(Integer, primary_key=True)
    total_views = Column(Integer, default=0)
    total_searches = Column(Integer, default=0)
    total_cart_adds = Column(Integer, default=0)
    total_purchases = Column(Integer, default=0)
    total_revenue = Column(Numeric(12, 2), default=0)
