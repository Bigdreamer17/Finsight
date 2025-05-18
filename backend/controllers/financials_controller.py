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
