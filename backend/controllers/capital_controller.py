from fastapi import HTTPException
from supabase import create_client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_capital_structure(company_id: str):
    resp = supabase.table("balance_sheet") \
        .select("fiscal_year, total_equity, total_liabilities") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(1) \
        .execute()

    if not resp.data:
        raise HTTPException(status_code=404, detail="No balance sheet data found")

    data = resp.data[0]
    return {
        "equity": data.get("total_equity", 0),
        "debt": data.get("total_liabilities", 0)
    }
