import os
from fastapi import HTTPException
from supabase import create_client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_company_snapshot_controller(company_id: str):
    try:
        balance_resp = (
            supabase.table("balance_sheet")
            .select("fiscal_year,total_assets,total_equity,total_liabilities,deferred_tax_liability,defined_benefits_obligation,regulatory_credit_risk_reserve")
            .eq("company_id", company_id)
            .order("fiscal_year", desc=True)
            .limit(1)
            .execute()
        )

        income_resp = (
            supabase.table("income_statement")
            .select("fiscal_year,profit_for_year,total_operating_income,basic_eps,net_operating_income")
            .eq("company_id", company_id)
            .order("fiscal_year", desc=True)
            .limit(1)
            .execute()
        )

        if not balance_resp.data or not income_resp.data:
            raise HTTPException(status_code=404, detail="Financial data not found")

        balance = balance_resp.data[0]
        income = income_resp.data[0]

        total_assets = balance["total_assets"]
        total_equity = balance["total_equity"]
        total_liabilities = balance["total_liabilities"]

        return {
            "last_fiscal_year": balance["fiscal_year"],
            "financials": {
                "total_assets": total_assets,
                "total_equity": total_equity,
                "total_liabilities": total_liabilities,
                "debt_to_equity_ratio": round(total_liabilities / total_equity, 4) if total_equity else None,
                "equity_ratio": round(total_equity / total_assets, 4) if total_assets else None,
                "profit_margin": round(income["profit_for_year"] / income["total_operating_income"], 4) if income["total_operating_income"] else None,
                "basic_eps": income["basic_eps"],
                "regulatory_credit_risk_reserve": balance["regulatory_credit_risk_reserve"],
                "deferred_tax_liabilities": balance["deferred_tax_liability"]
            }
        }

    except Exception as e:
        print("Error in /snapshot:", e)
        raise HTTPException(status_code=500, detail="Failed to retrieve snapshot")
