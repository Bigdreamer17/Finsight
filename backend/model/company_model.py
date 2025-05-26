import uuid

from sqlalchemy import Column, ForeignKey, Integer, Numeric, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from db.database import Base


class Company(Base):
    __tablename__ = "company"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
    )
    name = Column(String, index=True)
    stock_name = Column(String)
    stock_price = Column(Numeric(precision=15, scale=2))
    image_url = Column(String)
    sector = Column(String, index=True)
    phone = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    website = Column(String)
    description = Column(String)
    ceo = Column(String)
    po_box = Column(String)
    year_founded = Column(String)
    swift_code = Column(String, unique=True)


# class CompanyOverview(Base):
#     __tablename__ = "overview"
#
#     id = Column(
#         UUID(as_uuid=True),
#         primary_key=True,
#         default=uuid.uuid4,
#         unique=True,
#         index=True,
#     )
#     company_id = Column(
#         UUID(as_uuid=True),
#         ForeignKey("company.id", ondelete="CASCADE"),
#         nullable=False,
#     )
#     market_cap = Column(Numeric(precision=15, scale=2))
#     ev = Column(Numeric(precision=15, scale=2))
#     shares = Column(Numeric(precision=15, scale=2))
#     revenue = Column(Numeric(precision=15, scale=2))
#     employees = Column(Integer)
#     pe = Column(Numeric(precision=15, scale=2))
#     pb = Column(Numeric(precision=15, scale=2))
#     ev_sales = Column(Numeric(precision=15, scale=2))
#     ev_ebitda = Column(Numeric(precision=15, scale=2))
#     pcfc = Column(Numeric(precision=15, scale=2))
#     ev_gross_profit = Column(Numeric(precision=15, scale=2))
#     rev_three_years = Column(Numeric(precision=15, scale=2))
#     rev_five_years = Column(Numeric(precision=15, scale=2))
#     rev_ten_years = Column(Numeric(precision=15, scale=2))
#     de_three_years = Column(Numeric(precision=15, scale=2))
#     de_five_years = Column(Numeric(precision=15, scale=2))
#     de_ten_years = Column(Numeric(precision=15, scale=2))
#     rev_forward_two_years = Column(Numeric(precision=15, scale=2))
#     gross = Column(Numeric(precision=15, scale=2))
#     ebitda = Column(Numeric(precision=15, scale=2))
#     operating = Column(Numeric(precision=15, scale=2))
#     pre_tax = Column(Numeric(precision=15, scale=2))
#     net = Column(Numeric(precision=15, scale=2))
#     fcf = Column(Numeric(precision=15, scale=2))
#     roa = Column(Numeric(precision=15, scale=2))
#     rota = Column(Numeric(precision=15, scale=2))
#     roe = Column(Numeric(precision=15, scale=2))
#     roce = Column(Numeric(precision=15, scale=2))
#     roic = Column(Numeric(precision=15, scale=2))
#     dividends_yeild = Column(Numeric(precision=15, scale=2))
#     payout = Column(Numeric(precision=15, scale=2))
#     dps = Column(Numeric(precision=15, scale=2))
#     dps_three_years = Column(Numeric(precision=15, scale=2))
#     dps_five_years = Column(Numeric(precision=15, scale=2))
#     company = relationship(
#         "Company",
#         backref="overview",
#         passive_deletes=True,
#     )
