from fastapi import HTTPException
from supabase import create_client
import os
from math import pow

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def calculate_cagr(start_value, end_value, years):
    if start_value <= 0 or end_value <= 0 or years <= 0:
        return 0
    return round(pow(end_value / start_value, 1 / years) - 1, 4)

async def get_roi_metrics(company_id: str):
    resp = supabase.table("income_statement") \
        .select("fiscal_year, total_operating_income, profit_for_year, basic_eps") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=False) \
        .execute()

    data = resp.data

    if len(data) < 2:
        raise HTTPException(status_code=404, detail="Not enough data to calculate ROI")

    start = data[0]
    end = data[-1]
    years = end["fiscal_year"] - start["fiscal_year"]

    if years <= 0:
        raise HTTPException(status_code=400, detail="Invalid fiscal year range")

    revenue_growth = calculate_cagr(
        start.get("total_operating_income", 0),
        end.get("total_operating_income", 0),
        years
    )
    profit_growth = calculate_cagr(
        start.get("profit_for_year", 0),
        end.get("profit_for_year", 0),
        years
    )
    eps_growth = calculate_cagr(
        float(start.get("basic_eps") or 0),
        float(end.get("basic_eps") or 0),
        years
    )

    return {
        "average_revenue_growth": revenue_growth,
        "average_profit_growth": profit_growth,
        "average_eps_growth": eps_growth
    }
