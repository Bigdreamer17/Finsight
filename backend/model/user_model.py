import enum
import uuid

from sqlalchemy import Boolean, Column, DateTime, Enum, String, func
from sqlalchemy.dialects.postgresql import UUID

from db.database import Base


class UserRole(enum.Enum):
    USER = "user"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
    )
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    is_upgraded = Column(Boolean, default=False)
    role = Column(
        Enum(
            UserRole,
            name="userrole",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        nullable=False,
        default=UserRole.USER,
    )
    subscription_end_date = Column(DateTime(timezone=True), default=func.now())
