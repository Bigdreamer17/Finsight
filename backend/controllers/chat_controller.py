import os
import httpx
from fastapi import HTTPException
from supabase import create_client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def chat_about_company(company_id: str, question: str):
    # Get recent financials
    income_resp = supabase.table("income_statement") \
        .select("fiscal_year, total_operating_income, profit_for_year, basic_eps") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(3) \
        .execute()

    balance_resp = supabase.table("balance_sheet") \
        .select("total_assets, total_equity, total_liabilities") \
        .eq("company_id", company_id) \
        .order("fiscal_year", desc=True) \
        .limit(1) \
        .execute()

    company_resp = supabase.table("company").select("name").eq("id", company_id).single().execute()

    if not income_resp.data or not balance_resp.data or not company_resp.data:
        raise HTTPException(status_code=404, detail="Company data not found")

    name = company_resp.data["name"]
    income = income_resp.data
    balance = balance_resp.data[0]

    # Build prompt
    context = f"""
Company: {name}

Financials:
- Revenue (last 3 years): {[d['total_operating_income'] for d in income]}
- Profit (last 3 years): {[d['profit_for_year'] for d in income]}
- EPS (last 3 years): {[d['basic_eps'] for d in income]}
- Total Assets: {balance['total_assets']}
- Equity: {balance['total_equity']}
- Liabilities: {balance['total_liabilities']}
"""

    prompt = f"{context}\nUser Question: {question}"

    # Call OpenRouter
    headers = {
        "Authorization": f"Bearer {OPENROUTER_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "mistralai/devstral-small:free",
        "messages": [
            {"role": "system", "content": "You are a financial assistant that explains company health in plain language."},
            {"role": "user", "content": prompt}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="LLM API failed")
        return response.json()["choices"][0]["message"]["content"]
