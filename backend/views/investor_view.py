from fastapi import APIRouter
from controllers.investor_controller import get_investor_scores

router = APIRouter()

@router.get("/companies/{company_id}/investor-scores")
async def investor_scores(company_id: str):
    return await get_investor_scores(company_id)
