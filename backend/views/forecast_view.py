from fastapi import APIRouter
from controllers.forecast_controller import get_forecast_data

router = APIRouter()

router.add_api_route(
    "/companies/{company_id}/forecast",
    get_forecast_data,
    methods=["GET"],
    tags=["Forecast"]
)
