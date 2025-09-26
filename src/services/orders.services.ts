import { ShippingAddress } from "@/interfaces";
import {
  CashPaymentResponse,
  OnlinePaymentResponse,
  UserOrdersResponse,
} from "@/types/responses";

// Get user orders
export async function getUserOrders(
  userId: string
): Promise<UserOrdersResponse> {
  return await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
  )
    .then((res) => res.json())
    .catch((error) => error);
}

// Make cash order
export async function makeCashOrder(
  shippingAddress: ShippingAddress,
  cartId: string,
  token: string
): Promise<CashPaymentResponse> {
  return await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "post",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: {
          details: shippingAddress.details,
          phone: shippingAddress.phone,
          city: shippingAddress.city,
        },
      }),
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
}

// Make online payment order
export async function makeOnlinePaymentOrder(
  shippingAddress: ShippingAddress,
  cartId: string,
  token: string
): Promise<OnlinePaymentResponse> {
  return await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "post",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify(shippingAddress),
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
}
