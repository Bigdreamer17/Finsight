from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from controllers.investor_relations_controller import (
    get_executive_data, get_personnel_data, get_shareholder_information)
from db.database import get_db

router = APIRouter(prefix="/relations", tags=["Investor Relations"])


@router.get("/{company_id}/personnel")
def personnel_handler(
    company_id: str,
    sorted_by: str = Query(default=None),
    sort_order: str = Query(default="Desc"),
    db: Session = Depends(get_db),
):
    try:
        return get_personnel_data(
            db=db, company_id=company_id, sorted_by=sorted_by, sort_order=sort_order
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{company_id}/executives")
def executives_handler(
    company_id: str,
    sorted_by: str = Query(default=None),
    sort_order: str = Query(default="Desc"),
    db: Session = Depends(get_db),
):
    try:
        return get_executive_data(
            db=db, company_id=company_id, sorted_by=sorted_by, sort_order=sort_order
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{company_id}/information")
def information_handler(
    company_id: str,
    db: Session = Depends(get_db),
):
    try:
        return get_shareholder_information(db=db, company_id=company_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
