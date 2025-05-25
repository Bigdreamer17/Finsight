from fastapi import APIRouter
from controllers.roi_controller import get_roi_metrics

router = APIRouter()

@router.get("/companies/{company_id}/roi-metrics")
async def roi_metrics(company_id: str):
    return await get_roi_metrics(company_id)
