from fastapi import HTTPException
from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_investment_summary(company_id: str):
    # Get the latest year from income statement and balance sheet
    income_resp = supabase.table("income_statement") \
        .select("fiscal_year, profit_for_year, basic_eps") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(3) \
        .execute()

    balance_resp = supabase.table("balance_sheet") \
        .select("fiscal_year, total_equity, total_liabilities") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(1) \
        .execute()

    if not income_resp.data or not balance_resp.data:
        raise HTTPException(status_code=404, detail="Insufficient financial data")

    # ROE = Profit / Equity
    latest_income = income_resp.data[0]
    latest_balance = balance_resp.data[0]

    profit = latest_income.get("profit_for_year") or 0
    equity = latest_balance.get("total_equity") or 1  # avoid divide by 0
    liabilities = latest_balance.get("total_liabilities") or 0

    roe = round(profit / equity, 4)
    debt_to_equity = round(liabilities / equity, 4)

    # EPS Growth check
    eps_values = [entry["basic_eps"] or 0 for entry in reversed(income_resp.data)]
    eps_growth_consistent = all(eps_values[i] <= eps_values[i+1] for i in range(len(eps_values) - 1))

    # Determine investment potential
    if roe > 0.15 and debt_to_equity < 0.5 and eps_growth_consistent:
        label = "High"
        reason = "ROE > 15%, consistent EPS growth, and low debt-to-equity ratio"
    elif roe > 0.10 and debt_to_equity < 1:
        label = "Moderate"
        reason = "Decent ROE and manageable debt, but EPS growth not consistent"
    else:
        label = "Low"
        reason = "Low ROE or high debt or inconsistent earnings"

    return {
        "investment_potential": label,
        "reason": reason,
        "criteria": {
            "roe": roe,
            "eps_growth_consistent": eps_growth_consistent,
            "debt_to_equity": debt_to_equity
        }
    }
