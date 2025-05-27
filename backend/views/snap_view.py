from fastapi import APIRouter
from controllers.snap_controller import get_company_snapshot_controller
router = APIRouter()

@router.get("/companies/{company_id}/snapshot")
async def get_company_snapshot(company_id: str):
    return await get_company_snapshot_controller(company_id)
