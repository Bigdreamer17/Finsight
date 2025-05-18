from http import client
from fastapi import APIRouter, Body, HTTPException
from services.payment_service import create_payment
from pydantic import BaseModel
from typing import Dict
import supabase
import os

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

@router.get("/payment/verify/{tx_ref}")
async def verify_payment(tx_ref: str):
    headers = {
        "Autjorization": f"Bearer {os.getenv('CHAPA_SECRET_KEY')}"
    }

    res = await client.get(f"https://api.chapa.co/v1/transaction/verify/{tx_ref}", headers=headers)
    data = res.json()

    if data["status"] != "success":
        raise HTTPException(status_code=400, detail="Payment not successful")

    # extract user ID from tx_ref: format is upgrade-{user_id}-{uuid}
    try:
        user_id = tx_ref.split("-")[1]
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid tx_ref format")

    # mark user as upgraded
    update_resp = supabase.table("users").update({"is_upgraded": True}).eq("id", user_id).execute()

    return {"message": "Payment verified and user upgraded"}


@router.get("/payment/callback")
async def chapa_callback(tx_ref: str):
    # We just reuse the verification logic
    return await verify_payment(tx_ref)


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
