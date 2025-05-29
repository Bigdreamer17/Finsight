from fastapi import APIRouter, HTTPException
from services.forecast_service import get_forecasts_for_company

router = APIRouter()

@router.get("/companies/{company_id}/forecast")
async def get_forecast_data(company_id: str):
    try:
        result = get_forecasts_for_company(company_id)
        return result
    except Exception as e:
        print(f"Error in forecast controller: {e}")
        raise HTTPException(status_code=500, detail="Failed to get forecast data")
