import { CartResponse, GetCartResponse, IClearCart } from "@/interfaces";

export async function addProductToCart(
  productId: string,
  token: string
): Promise<CartResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "post",
    headers: {
      "content-type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  })
    .then((res) => res.json())
    .catch((error) => error);
}

//  Get logged user cart

export async function getLoggedUserCart(
  token: string
): Promise<GetCartResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token,
    },

  })
    .then((res) => res.json())
    .catch((error) => error);
}

//  Delete product from cart
export async function removeProduct(
  productId: string,
  token: string
): Promise<GetCartResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/" + `${productId}`,
    {
      method: "delete",
      headers: {
        token,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
}

// Clear Cart

export async function clearUserCart(token: string): Promise<IClearCart> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
    method: "delete",
    headers: {
      token,
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
}

//  Update product cart
export async function updateProduct(
  productId: string,
  newQuantity: number,
  token: string
): Promise<GetCartResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/" + `${productId}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token,
      },
      body: JSON.stringify({
        count: newQuantity,
      }),
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
}
