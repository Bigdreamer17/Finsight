from fastapi import APIRouter, Query
from controllers.graph_controller import get_graph_data, get_all_graph_data

router = APIRouter()

@router.get("/companies/{company_id}/graph-data")
async def graph_data(company_id: str, metric: str = Query(..., example="revenue")):
    return await get_graph_data(company_id, metric)


@router.get("/companies/{company_id}/graph-data/all")
async def all_graph_data(company_id: str):
    return await get_all_graph_data(company_id)
