from fastapi import HTTPException
from sqlalchemy.orm import Session

from model.company_model import Company


def get_user_by_email(db: Session, email: str):
    return db.query(Company).filter(Company.email == email).first()


def create_company(
    db: Session,
    name: str,
    stock_name: str,
    stock_price: int,
    sector: str,
    phone: str,
    email: str,
    website: str,
    description: str,
    ceo: str,
    po_box: str,
    year_founded: str,
    swift_code: str,
):
    existing_company = (
        db.query(Company)
        .filter(
            (Company.email == email)
            | (Company.name == name)
            | (Company.swift_code == swift_code)
        )
        .first()
    )
    if existing_company:
        raise ValueError("company already exists")

    new_company = Company(
        name=name,
        stock_price=stock_price,
        stock_name=stock_name,
        sector=sector,
        phone=phone,
        email=email,
        website=website,
        description=description,
        ceo=ceo,
        po_box=po_box,
        year_founded=year_founded,
        swift_code=swift_code,
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


def get_company_by_id(db: Session, company_id: str):
    existing_company = db.query(Company).filter(Company.id == company_id).first()
    if not existing_company:
        HTTPException(status_code=404, detail="company not found")

    return existing_company


def get_companies(db: Session):
    companies = db.query(Company).all()

    return companies
