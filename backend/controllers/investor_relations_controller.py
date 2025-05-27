from sqlalchemy import asc, desc
from sqlalchemy.orm import Session

from model.investor_relations_model import (ExecutiveManagement, Information,
                                            Personnel)


# Generic utility for dynamic sorting
def apply_sorting(query, model, sorted_by: str = None, sort_order: str = None):
    if sorted_by:
        column = getattr(model, sorted_by, None)
        if column is None:
            raise ValueError(f"Invalid sort field: {sorted_by}")
        if sort_order and sort_order.lower() == "desc":
            query = query.order_by(desc(column))
        else:
            query = query.order_by(asc(column))
    return query


def get_personnel_data(
    db: Session, company_id: str, sorted_by: str = None, sort_order: str = "Desc"
):
    query = db.query(Personnel).filter(Personnel.company_id == company_id)
    board_of_directors = (
        apply_sorting(query, Personnel, sorted_by, sort_order) if sorted_by else query
    )

    return board_of_directors.all()


def get_executive_data(
    db: Session, company_id: str, sorted_by: str = None, sort_order: str = "Desc"
):
    query = db.query(ExecutiveManagement).filter(
        ExecutiveManagement.company_id == company_id
    )
    executive_managment = (
        apply_sorting(query, ExecutiveManagement, sorted_by, sort_order)
        if sorted_by
        else query
    )

    return executive_managment.all()


def get_shareholder_information(db: Session, company_id: str):
    return db.query(Information).filter(Information.company_id == company_id).all()
