from fastapi import APIRouter
from controllers.investment_controller import get_investment_summary

router = APIRouter()

@router.get("/companies/{company_id}/investment-summary")
async def investment_summary(company_id: str):
    return await get_investment_summary(company_id)
