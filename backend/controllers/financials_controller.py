from fastapi import APIRouter, Request, HTTPException
from db.supabase import supabase
from services.jwt import get_current_user

router = APIRouter()

@router.get("/companies/{company_id}/income-statements")
async def get_income_statements(company_id: str, request: Request):
    user = get_current_user(request)
    user_email = user["sub"]

    # Get is_upgraded
    user_resp = supabase.table("users").select("is_upgraded").eq("email", user_email).single().execute()
    if not user_resp.data:
        raise HTTPException(status_code=404, detail="User not found")

    is_upgraded = user_resp.data["is_upgraded"]

    # Fetch income statements
    reports = supabase.table("income_statement").select("*").eq("company_id", company_id).execute().data

    if not is_upgraded:
        # Restrict fields for non-premium users
        for report in reports:
            # Keep only year and total income
            report_fields_to_keep = ["fiscal_year", "total_operating_income"]
            for key in list(report.keys()):
                if key not in report_fields_to_keep:
                    report[key] = None

    return reports

@router.get("/companies/{company_id}/cash-flow")
async def get_cash_flows(company_id: str, request: Request):
    user = get_current_user(request)
    user_email = user["sub"]

    # Get upgrade status
    user_resp = supabase.table("users").select("is_upgraded").eq("email", user_email).execute()
    user_data = user_resp.data
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    is_upgraded = user_data[0]["is_upgraded"]

    # Get cash flow reports
    report_resp = supabase.table("cash_flow") \
        .select("*") \
        .eq("company_id", str(company_id)) \
        .order("fiscal_year", desc=True) \
        .execute()

    reports = report_resp.data or []

    # Limit for free users
    if not is_upgraded:
        reports = reports[:2]

    return reports

@router.get("/companies/{company_id}/balance-sheets")
async def get_balance_sheets(company_id: str, request: Request):
    user = get_current_user(request)
    user_email = user["sub"]

    user_resp = supabase.table("users").select("is_upgraded").eq("email", user_email).execute()
    user_data = user_resp.data
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    is_upgraded = user_data[0]["is_upgraded"]

    report_resp = supabase.table("balance_sheet") \
        .select("*") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .execute()

    reports = report_resp.data or []

    if not is_upgraded:
        reports = reports[:2]

    return reports
