import argparse

from bot.orders import place_order
from bot.validators import (
    validate_side,
    validate_order_type,
    validate_quantity
)

parser = argparse.ArgumentParser()

parser.add_argument("--symbol", required=True)
parser.add_argument("--side", required=True)
parser.add_argument("--type", required=True)
parser.add_argument("--quantity", type=float, required=True)
parser.add_argument("--price", type=float)

args = parser.parse_args()

try:

    validate_side(args.side)
    validate_order_type(args.type)
    validate_quantity(args.quantity)

    if args.type == "LIMIT" and not args.price:
        raise ValueError("Price is required for LIMIT order")

    response = place_order(
        symbol=args.symbol,
        side=args.side,
        order_type=args.type,
        quantity=args.quantity,
        price=args.price
    )

    print("\nORDER SUCCESS")
    print(f"Order ID: {response['orderId']}")
    print(f"Status: {response['status']}")
    print(f"Executed Quantity: {response['executedQty']}")

except Exception as e:

    print(f"\nERROR: {str(e)}")