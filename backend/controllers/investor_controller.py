from fastapi import HTTPException
from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_investor_scores(company_id: str):
    # Fetch 3 most recent income statements and latest balance sheet
    income_resp = supabase.table("income_statement") \
        .select("fiscal_year, profit_for_year, basic_eps, total_operating_income") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(3) \
        .execute()

    balance_resp = supabase.table("balance_sheet") \
        .select("fiscal_year, total_equity, total_liabilities, total_assets") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(1) \
        .execute()

    if not income_resp.data or not balance_resp.data:
        raise HTTPException(status_code=404, detail="Not enough financial data to rate this company")

    latest_income = income_resp.data[0]
    latest_balance = balance_resp.data[0]

    profit = latest_income.get("profit_for_year", 0)
    equity = latest_balance.get("total_equity", 1)
    liabilities = latest_balance.get("total_liabilities", 0)
    assets = latest_balance.get("total_assets", 1)

    roe = round(profit / equity, 4)
    debt_to_equity = round(liabilities / equity, 4)
    profit_margin = round(profit / latest_income.get("total_operating_income", 1), 4)

    # EPS consistency
    eps_values = [entry.get("basic_eps", 0) or 0 for entry in reversed(income_resp.data)]
    eps_growth = all(eps_values[i] <= eps_values[i + 1] for i in range(len(eps_values) - 1))

    # Investor evaluations
    buffett = {
        "grade": "A" if roe > 0.15 and debt_to_equity < 0.5 and eps_growth and profit_margin > 0.2 else "B" if roe > 0.10 else "C",
        "comment": "",
        "logic": [
            "ROE > 15%",
            "Debt-to-equity < 0.5",
            "Consistent EPS growth",
            "High profit margin"
        ]
    }
    if buffett["grade"] == "A":
        buffett["comment"] = "Strong ROE and consistent earnings growth. Buffett would likely invest."
    elif buffett["grade"] == "B":
        buffett["comment"] = "Average ROE and some risk. Might require more diligence."
    else:
        buffett["comment"] = "Doesn't meet Buffett’s strict criteria."

    lynch = {
        "grade": "A" if eps_growth and roe > 0.12 and debt_to_equity < 1 else "B" if roe > 0.10 else "C",
        "comment": "",
        "logic": [
            "EPS growing",
            "P/E ratio not available (demo)",
            "ROE > 12%"
        ]
    }
    lynch["comment"] = "Good growth potential." if lynch["grade"] == "A" else "Decent fundamentals." if lynch["grade"] == "B" else "Weak on Lynch metrics."

    graham = {
        "grade": "A" if debt_to_equity < 1 and eps_growth else "B" if debt_to_equity < 2 else "C",
        "comment": "",
        "logic": [
            "Debt-to-equity < 1",
            "Strong earnings history",
            "Price/book not available (demo)"
        ]
    }
    graham["comment"] = "Stable and conservative. Matches Graham’s philosophy." if graham["grade"] == "A" else "Moderate risk." if graham["grade"] == "B" else "Too risky for Graham’s style."

    return {
        "warren_buffett": buffett,
        "peter_lynch": lynch,
        "benjamin_graham": graham
    }
