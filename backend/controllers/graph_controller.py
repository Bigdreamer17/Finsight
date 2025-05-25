import os

from fastapi import HTTPException
from supabase import create_client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


async def get_three_graph_metrics(company_id: str):
    response = (
        supabase.table("income_statement")
        .select("fiscal_year, total_operating_income, profit_for_year, basic_eps")
        .eq("company_id", company_id)
        .order("fiscal_year", desc=False)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="No financial data found")

    return {
        "revenue": [
            {
                "year": row["fiscal_year"],
                "count": row.get("total_operating_income", 0) or 0,
            }
            for row in response.data
        ],
        "net_profit": [
            {"year": row["fiscal_year"], "count": row.get("profit_for_year", 0) or 0}
            for row in response.data
        ],
        "eps": [
            {"year": row["fiscal_year"], "count": row.get("basic_eps", 0) or 0}
            for row in response.data
        ],
    }


async def get_all_graph_data(company_id: str):
    # Fetch income statement
    income_resp = (
        supabase.table("income_statement")
        .select("fiscal_year, total_operating_income, profit_for_year, basic_eps")
        .eq("company_id", company_id)
        .order("fiscal_year", desc=False)
        .execute()
    )

    # Fetch balance sheet
    balance_resp = (
        supabase.table("balance_sheet")
        .select("fiscal_year, total_assets, total_equity")
        .eq("company_id", company_id)
        .order("fiscal_year", desc=False)
        .execute()
    )

    if not income_resp.data and not balance_resp.data:
        raise HTTPException(status_code=404, detail="No data found for this company")

    # Index by year for easy matching
    income_map = {row["fiscal_year"]: row for row in income_resp.data}
    balance_map = {row["fiscal_year"]: row for row in balance_resp.data}

    # Unified set of fiscal years
    years = sorted(set(income_map.keys()) | set(balance_map.keys()))

    def extract(metric_key, source_map):
        return [
            {"year": year, "count": source_map.get(year, {}).get(metric_key, 0) or 0}
            for year in years
        ]

    return {
        "revenue": extract("total_operating_income", income_map),
        "net_profit": extract("profit_for_year", income_map),
        "eps": extract("basic_eps", income_map),
        "assets": extract("total_assets", balance_map),
        "equity": extract("total_equity", balance_map),
    }
