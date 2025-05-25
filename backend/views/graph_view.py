from fastapi import APIRouter, Query
from controllers.graph_controller import get_three_graph_metrics, get_all_graph_data

router = APIRouter()


@router.get("/companies/{company_id}/graph-data/all")
async def all_graph_data(company_id: str):
    return await get_all_graph_data(company_id)

@router.get("/companies/{company_id}/graph-data")
async def company_graph_data(company_id: str):
    return await get_three_graph_metrics(company_id)