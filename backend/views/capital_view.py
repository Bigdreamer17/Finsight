from fastapi import APIRouter
from controllers.capital_controller import get_capital_structure

router = APIRouter()

@router.get("/companies/{company_id}/capital-structure")
async def capital_structure(company_id: str):
    return await get_capital_structure(company_id)
