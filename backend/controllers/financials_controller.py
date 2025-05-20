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


@router.get("/companies/{company_id}/kpis")
async def get_kpis(company_id: str, request: Request):
    user = get_current_user(request)
    user_email = user["sub"]

    # Check upgrade status
    user_resp = supabase.table("users").select("is_upgraded").eq("email", user_email).execute()
    user_data = user_resp.data
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    is_upgraded = user_data[0]["is_upgraded"]

    # Get both financials, ordered by year (DESC)
    income_resp = supabase.table("income_statement") \
        .select("*") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .execute()

    balance_resp = supabase.table("balance_sheet") \
        .select("*") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .execute()

    income_data = income_resp.data or []
    balance_data = balance_resp.data or []

    if not is_upgraded:
        income_data = income_data[:2]
        balance_data = balance_data[:2]

    # Create a dict to join by fiscal_year
    balance_dict = {b["fiscal_year"]: b for b in balance_data}
    kpi_result = []

    for income in income_data:
        year = income["fiscal_year"]
        balance = balance_dict.get(year)

        if not balance:
            continue

        try:
            roa = round((income["profit_for_year"] or 0) / (balance["total_assets"] or 1), 4)
            roe = round((income["profit_for_year"] or 0) / (balance["total_equity"] or 1), 4)
            profit_margin = round((income["profit_for_year"] or 0) / (income["total_operating_income"] or 1), 4)
            asset_turnover = round((income["total_operating_income"] or 0) / (balance["total_assets"] or 1), 4)
            leverage_ratio = round((balance["total_assets"] or 0) / (balance["total_equity"] or 1), 4)
            eps = float(income["basic_eps"] or 0.0)

            kpi_result.append({
                "fiscal_year": year,
                "roa": roa,
                "roe": roe,
                "profit_margin": profit_margin,
                "asset_turnover": asset_turnover,
                "leverage_ratio": leverage_ratio,
                "basic_eps": eps
            })
        except Exception as e:
            print(f"KPI calc error for {year}: {e}")
            continue

    return kpi_result

