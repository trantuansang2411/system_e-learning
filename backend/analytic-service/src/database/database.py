from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from src.config import DATABASE_URL


engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    connect_args={"server_settings": {"timezone": "Asia/Ho_Chi_Minh"}},
)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def create_tables():
    # Import models so SQLAlchemy registers them with Base.metadata
    import src.models.analytics_model as _  # noqa: F401

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
