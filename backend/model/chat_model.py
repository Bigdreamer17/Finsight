import uuid

from sqlalchemy import (CheckConstraint, Column, DateTime, ForeignKey, String,
                        func)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db.database import Base


class Chat(Base):
    __tablename__ = "chats"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
    )
    company_id = Column(
        UUID(as_uuid=True),
        ForeignKey("company.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    chat = Column(String, nullable=False)
    sender = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    company = relationship(
        "Company",
        backref="chats",
        passive_deletes=True,
    )
    user = relationship(
        "User",
        backref="chats",
        passive_deletes=True,
    )
    __table_args__ = (
        CheckConstraint("sender IN ('user', 'bot')", name="check_sender_valid"),
    )
