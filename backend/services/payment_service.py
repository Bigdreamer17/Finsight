import os 
import httpx
import uuid
from fastapi import HTTPException


async def create_payment(user_id: str, email:str, first_name: str, last_name: str, amount: float, currency: str, title: str, description: str):
    
    CHAPA_SECRET_KEY = os.getenv("CHAPA_SECRET_KEY")
    CHAPA_BASE_URL = os.getenv("CHAPA_BASE_URL")
    CHAPA_CALLBACK_URL = os.getenv("CHAPA_CALLBACK_URL")
    CHAPA_RETURN_URL = os.getenv("CHAPA_RETURN_URL")
    
    
    tx_ref = f"upgrade-{user_id}-{uuid.uuid4()}"
    payload = {
        "amount": str(amount),
        "currency": currency,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "tx_ref": tx_ref,
        "callback_url": CHAPA_CALLBACK_URL,
        "return_url": CHAPA_RETURN_URL,
        "customization[title]": title,
        "customization[description]": description
    }

    headers = {
        "Authorization": f"Bearer {CHAPA_SECRET_KEY}"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{CHAPA_BASE_URL}/transaction/initialize", json=payload, headers=headers)
        if response.status_code != 200:
            print("Error response:", response.text)
            raise HTTPException(status_code=500, detail="Failed to initialize payment")
        
        data = response.json()
        if data["status"] != "success":
            raise HTTPException(status_code=400, detail="Payment initiation failed")

        return {
            "checkout_url": data["data"]["checkout_url"],
            "tx_ref": tx_ref
        }