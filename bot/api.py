from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from bot.orders import place_order
from bot.validators import (
    validate_order_type,
    validate_quantity,
    validate_side,
)

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

app = FastAPI(title="Trading Bot", version="1.0.0")


class OrderRequest(BaseModel):
    symbol: str = Field(..., min_length=1, examples=["BTCUSDT"])
    side: str = Field(..., examples=["BUY"])
    order_type: str = Field(..., alias="type", examples=["MARKET"])
    quantity: float = Field(..., gt=0)
    price: Optional[float] = Field(None, gt=0)

    model_config = {"populate_by_name": True}


class OrderResponse(BaseModel):
    success: bool
    symbol: str
    side: str
    order_type: str
    order_id: Optional[int] = None
    status: Optional[str] = None
    executed_qty: Optional[str] = None
    message: Optional[str] = None


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/orders", response_model=OrderResponse)
def create_order(body: OrderRequest):
    symbol = body.symbol.strip().upper()
    side = body.side.strip().upper()
    order_type = body.order_type.strip().upper()

    try:
        validate_side(side)
        validate_order_type(order_type)
        validate_quantity(body.quantity)

        if order_type == "LIMIT" and body.price is None:
            raise ValueError("Price is required for LIMIT orders")

        response = place_order(
            symbol=symbol,
            side=side,
            order_type=order_type,
            quantity=body.quantity,
            price=body.price,
        )

        return OrderResponse(
            success=True,
            symbol=symbol,
            side=side,
            order_type=order_type,
            order_id=response.get("orderId"),
            status=response.get("status"),
            executed_qty=response.get("executedQty"),
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        ) from e


@app.get("/")
def index():
    return FileResponse(FRONTEND_DIR / "index.html")


app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")
