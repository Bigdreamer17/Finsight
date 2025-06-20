# from http import client
from fastapi import APIRouter, Body, HTTPException, Request, status
from services.payment_service import create_payment
from pydantic import BaseModel
from typing import Dict
import supabase
import os
from datetime import datetime, timedelta, timezone

router = APIRouter()

class PaymentRequest(BaseModel):
    user_id: str
    email: str
    first_name: str
    last_name: str
    amount: float
    currency: str 
    title: str 
    description: str

@router.post("/pay/upgrade")
async def pay_upgrade(payload: PaymentRequest) -> Dict[str, str]:
    return await create_payment(
        user_id=payload.user_id,
        email=payload.email,
        first_name=payload.first_name,
        last_name=payload.last_name,
        amount=payload.amount,
        currency=payload.currency,
        title=payload.title,
        description=payload.description
    )

@router.post("/payment/callback", status_code=status.HTTP_204_NO_CONTENT)
async def chapa_callback(req: Request):
    body = await req.json()
    tx_ref = body.get("data", {}).get("tx_ref")
    if not tx_ref:
        raise HTTPException(400, "tx_ref missing")

    # 1‑a) Double‑check with Chapa
    if not await verify_with_chapa(tx_ref):
        raise HTTPException(400, "Verification failed")
    
    expiry = datetime.now(timezone.utc) + timedelta(days=60) 

    # 1‑b) upgrade user
    user_id = tx_ref.split("-")[1]
    supabase.table("users")\
        .update({
            "is_upgraded": True,
            "subscription_end_date": expiry
        })\
        .eq("id", user_id)\
        .execute()
    return  # 204 No Content is fine for webhooks

# services/payment_service.py
async def verify_with_chapa(tx_ref: str) -> bool:
    url = f"{os.getenv('CHAPA_BASE_URL')}/transaction/verify/{tx_ref}"
    headers = {"Authorization": f"Bearer {os.getenv('CHAPA_SECRET_KEY')}"}
    async with httpx.AsyncClient() as client:
        r = await client.get(url, headers=headers)
    j = r.json()
    return j.get("status") == "success"


from fastapi.responses import HTMLResponse

@router.get("/payment/success", response_class=HTMLResponse)
async def payment_success():
    return """
    <html>
        <head><title>Payment Success</title></head>
        <body style="text-align:center; padding-top:50px;">
            <h1>🎉 Payment Successful!</h1>
            <p>Thank you for upgrading to premium.</p>
            <a href="/">Return to homepage</a>
        </body>
    </html>
    """
