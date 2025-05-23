from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from controllers.company_controller import (create_company, get_companies,
                                            get_company_by_id)
from db.database import get_db

router = APIRouter(prefix="/companies", tags=["Company"])


class CompanyCreate(BaseModel):
    name: str
    stock_name: Optional[str] = ""
    stock_price: Optional[int]
    sector: str
    phone: str
    email: str
    website: str
    description: str
    ceo: str
    po_box: str
    year_founded: str
    swift_code: str


@router.post("")
def create_company_route(company: CompanyCreate, db: Session = Depends(get_db)):
    try:
        created_company = create_company(
            db=db,
            name=company.name,
            stock_name=company.stock_name,
            stock_price=company.stock_price,
            sector=company.sector,
            phone=company.phone,
            email=company.email,
            website=company.website,
            description=company.description,
            ceo=company.ceo,
            po_box=company.po_box,
            year_founded=company.year_founded,
            swift_code=company.swift_code,
        )

        return {
            "name": create_company.name,
            "stockName": created_company.stock_name,
            "stockPrice": created_company.stock_price,
            "sector": created_company.sector,
            "phone": created_company.phone,
            "email": created_company.email,
            "website": created_company.website,
            "description": created_company.description,
            "ceo": created_company.ceo,
            "poBox": created_company.po_box,
            "yearFounded": created_company.year_founded,
            "swiftCode": created_company.swift_code,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("")
def get_all_companies_route(db: Session = Depends(get_db)):
    try:
        companies = get_companies(
            db=db,
        )

        return companies

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{company_id}")
def get_company_by_id_route(company_id: str, db: Session = Depends(get_db)):
    try:
        company = get_company_by_id(company_id=company_id, db=db)

        return company
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
