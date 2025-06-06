"""Update subscription_end_date column

Revision ID: 6dedb0a8fc0b
Revises: e139521e80c7
Create Date: 2025-05-20 10:25:13.333264

"""

from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "6dedb0a8fc0b"
down_revision: Union[str, None] = "e139521e80c7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "users",
        "subscription_end_date",
        existing_type=postgresql.TIMESTAMP(),
        type_=sa.DateTime(timezone=True),
        existing_nullable=True,
        existing_server_default=sa.text("now()"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "users",
        "subscription_end_date",
        existing_type=sa.DateTime(timezone=True),
        type_=postgresql.TIMESTAMP(),
        existing_nullable=True,
        existing_server_default=sa.text("now()"),
    )
    # ### end Alembic commands ###
