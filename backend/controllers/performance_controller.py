from fastapi import HTTPException
from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_performance_indicators(company_id: str):
    # Get latest year data
    income_resp = supabase.table("income_statement") \
        .select("fiscal_year, profit_for_year") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(1) \
        .execute()

    balance_resp = supabase.table("balance_sheet") \
        .select("fiscal_year, total_assets, total_equity, total_liabilities") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(1) \
        .execute()

    if not income_resp.data or not balance_resp.data:
        raise HTTPException(status_code=404, detail="Insufficient data for performance")

    profit = income_resp.data[0]["profit_for_year"] or 0
    equity = balance_resp.data[0]["total_equity"] or 1
    assets = balance_resp.data[0]["total_assets"] or 1
    liabilities = balance_resp.data[0]["total_liabilities"] or 0

    roa = round(profit / assets, 4)
    roe = round(profit / equity, 4)
    debt_to_equity = round(liabilities / equity, 4)

    profitability = "Strong" if roe > 0.15 else "Moderate" if roe > 0.10 else "Weak"
    risk = "Low" if debt_to_equity < 0.5 else "Medium" if debt_to_equity < 1 else "High"

    return {
        "roa": roa,
        "roe": roe,
        "debt_to_equity": debt_to_equity,
        "profitability": profitability,
        "risk": risk
    }
