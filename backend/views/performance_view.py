from fastapi import APIRouter
from controllers.performance_controller import get_performance_indicators

router = APIRouter()

@router.get("/companies/{company_id}/performance-indicators")
async def performance_indicators(company_id: str):
    return await get_performance_indicators(company_id)
