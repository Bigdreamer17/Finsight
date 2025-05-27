from fastapi import HTTPException
from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_dashboard_metrics_controller(sort_by: str = None, order: str = "desc"):
    try:
        company_resp = supabase.table("company").select("id, name, sector").execute()
        income_resp = supabase.table("income_statement").select("company_id, fiscal_year, profit_for_year, basic_eps, total_operating_income").execute()
        balance_resp = supabase.table("balance_sheet").select("company_id, fiscal_year, total_equity, total_liabilities").execute()

        companies = company_resp.data
        income_statements = income_resp.data
        balance_sheets = balance_resp.data

        metrics = []

        for company in companies:
            company_id = company["id"]
            name = company["name"]
            sector = company["sector"]

            # Latest income & balance
            income_data = [i for i in income_statements if i["company_id"] == company_id]
            balance_data = [b for b in balance_sheets if b["company_id"] == company_id]

            if not income_data or not balance_data:
                continue

            latest_income = sorted(income_data, key=lambda x: x["fiscal_year"], reverse=True)[0]
            latest_balance = sorted(balance_data, key=lambda x: x["fiscal_year"], reverse=True)[0]

            # Metrics
            eps = latest_income.get("basic_eps")
            profit = latest_income.get("profit_for_year")
            equity = latest_balance.get("total_equity")
            liabilities = latest_balance.get("total_liabilities")

            roe = round(profit / equity, 4) if profit and equity else None
            dte_ratio = round(liabilities / equity, 4) if liabilities and equity else None
            profit_margin = round(profit / latest_income["total_operating_income"], 4) if latest_income["total_operating_income"] else None

            metrics.append({
                "name": name,
                "sector": sector,
                "eps": eps,
                "roe": roe,
                "debt_to_equity": dte_ratio,
                "profit_margin": profit_margin
            })

        if sort_by and sort_by in ["eps", "roe", "debt_to_equity", "profit_margin"]:
            metrics = sorted(metrics, key=lambda x: (x[sort_by] is not None, x[sort_by]), reverse=(order == "desc"))

        return metrics

    except Exception as e:
        print("Error in dashboard controller:", e)
        raise HTTPException(status_code=500, detail="Failed to compute dashboard metrics")
