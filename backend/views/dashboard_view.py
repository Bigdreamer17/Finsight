from fastapi import APIRouter, Query

from controllers.dashboard_controller import get_dashboard_metrics_controller

router = APIRouter()


@router.get("/dashboard/metrics")
async def get_dashboard_metrics(
    sort_by: str = Query(
        None, enum=["name", "eps", "roe", "debt_to_equity", "profit_margin"]
    ),
    order: str = Query("desc", enum=["asc", "desc"]),
):
    return await get_dashboard_metrics_controller(sort_by=sort_by, order=order)
