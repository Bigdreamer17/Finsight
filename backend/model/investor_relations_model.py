import uuid

from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db.database import Base


class Personnel(Base):
    __tablename__ = "personnel"

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
    )
    name = Column(String, index=True)
    title = Column(String, index=True)
    appointment_date = Column(String)
    company = relationship(
        "Company",
        backref="personnel",
        passive_deletes=True,
    )


class ExecutiveManagement(Base):
    __tablename__ = "executives"

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
    )
    name = Column(String, index=True)
    position = Column(String, index=True)
    appointment_date = Column(String)
    company = relationship(
        "Company",
        backref="executives",
        passive_deletes=True,
    )


class Information(Base):
    __tablename__ = "shareholder_information"

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
    )
    information = Column(String, index=True)
    company = relationship(
        "Company",
        backref="information",
        passive_deletes=True,
    )
