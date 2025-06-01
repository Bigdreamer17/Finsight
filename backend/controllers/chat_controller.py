import os
from datetime import datetime, timedelta, timezone
from uuid import UUID

import httpx
from fastapi import HTTPException
from sqlalchemy.orm import Session
from supabase import create_client

from model.chat_model import Chat

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")
OPENROUTER_KEY = os.getenv("OPENROUTER_API_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


async def chat_about_company(company_id: str, question: str, user_email: str):
    # Get user by email
    user_resp = (
        supabase.table("users").select("id").eq("email", user_email).single().execute()
    )

    if not user_resp.data:
        raise HTTPException(status_code=404, detail="User not found")

    user_id = user_resp.data["id"]
    now = datetime.now(timezone.utc)
    last_24h_start = (now - timedelta(hours=24)).isoformat()
    now_iso = now.isoformat()

    history_resp = (
        supabase.table("chats")
        .select("chat, sender, created_at")
        .eq("company_id", company_id)
        .eq("user_id", user_id)
        .gte("created_at", last_24h_start)
        .lte("created_at", now_iso)
        .order("created_at", desc=False)
        .execute()
    )

    chat_history = history_resp.data or []

    # Format chat history for context
    history_text = ""
    for chat in chat_history:
        sender = "User" if chat["sender"] == "user" else "Bot"
        history_text += f"{sender}: {chat['chat']}\n"

    # Get recent financials
    income_resp = (
        supabase.table("income_statement")
        .select("fiscal_year, total_operating_income, profit_for_year, basic_eps")
        .eq("company_id", company_id)
        .order("fiscal_year", desc=True)
        .limit(3)
        .execute()
    )

    balance_resp = (
        supabase.table("balance_sheet")
        .select("total_assets, total_equity, total_liabilities")
        .eq("company_id", company_id)
        .order("fiscal_year", desc=True)
        .limit(1)
        .execute()
    )

    company_resp = (
        supabase.table("company").select("name").eq("id", company_id).single().execute()
    )

    if not income_resp.data or not balance_resp.data or not company_resp.data:
        raise HTTPException(status_code=404, detail="Company data not found")

    name = company_resp.data["name"]
    income = income_resp.data
    balance = balance_resp.data[0]

    # Build prompt
    financial_context = f"""
Company: {name}

Financials:
- Revenue (last 3 years): {[d['total_operating_income'] for d in income]}
- Profit (last 3 years): {[d['profit_for_year'] for d in income]}
- EPS (last 3 years): {[d['basic_eps'] for d in income]}
- Total Assets: {balance['total_assets']}
- Equity: {balance['total_equity']}
- Liabilities: {balance['total_liabilities']}
"""

    # Combine chat history + financial context + current question
    prompt = (
        f"{financial_context}\nChat History:\n{history_text}\nUser Question: {question}"
    )

    # Call OpenRouter
    headers = {
        "Authorization": f"Bearer {OPENROUTER_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "mistralai/devstral-small:free",
        "messages": [
            {
                "role": "system",
                "content": "You are a financial assistant that explains company health in plain language.",
            },
            {"role": "user", "content": prompt},
        ],
    }

    async with httpx.AsyncClient(timeout=httpx.Timeout(30.0)) as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
        )
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="LLM API failed")
        bot_reply = response.json()["choices"][0]["message"]["content"]

    # Save user question
    supabase.table("chats").insert(
        {
            "company_id": company_id,
            "user_id": user_id,
            "chat": question,
            "sender": "user",
        }
    ).execute()

    # Save bot response
    supabase.table("chats").insert(
        {
            "company_id": company_id,
            "user_id": user_id,
            "chat": bot_reply,
            "sender": "bot",
        }
    ).execute()

    return bot_reply


def get_chat(company_id: str, user_id: UUID, db: Session):
    last_24_hours = datetime.utcnow() - timedelta(hours=24)
    return (
        db.query(Chat)
        .filter(
            Chat.company_id == company_id,
            Chat.user_id == user_id,
            Chat.created_at >= last_24_hours,
        )
        .order_by(Chat.created_at)
        .all()
    )
