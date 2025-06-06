"""Create chats table

Revision ID: fe818207607a
Revises: b736285da0b3
Create Date: 2025-05-27 14:02:41.144056

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "fe818207607a"
down_revision: Union[str, None] = "b736285da0b3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "chats",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("company_id", sa.UUID(), nullable=False),
        sa.Column("user_id", sa.UUID(), nullable=False),
        sa.Column("chat", sa.String(), nullable=False),
        sa.Column("sender", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.CheckConstraint("sender IN ('user', 'bot')", name="check_sender_valid"),
        sa.ForeignKeyConstraint(["company_id"], ["company.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_chats_company_id"), "chats", ["company_id"], unique=False)
    op.create_index(op.f("ix_chats_id"), "chats", ["id"], unique=True)
    op.create_index(op.f("ix_chats_user_id"), "chats", ["user_id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_chats_user_id"), table_name="chats")
    op.drop_index(op.f("ix_chats_id"), table_name="chats")
    op.drop_index(op.f("ix_chats_company_id"), table_name="chats")
    op.drop_table("chats")
    # ### end Alembic commands ###
