import {
  AddToWhishListResponse,
  GetFromWhishListResponse,
  RemoveFromWhishListResponse,
} from "@/types/responses";

const loggedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzk2MGI5MDhiZjU1NzYxMDlmYmE0NyIsIm5hbWUiOiJNYXJ3YW4iLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODM3MDA2MSwiZXhwIjoxNzY2MTQ2MDYxfQ.OUC2uWlmm75DiFnoXeaEaAvnnuM1l67TbrswfTSvvVY";

//   Add to wishlist
export async function addToWhishList(
  productId: string
): Promise<AddToWhishListResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "post",
    headers: {
      token: loggedToken,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  })
    .then((res) => res.json())
    .catch((error) => error);
}

// Getting wishlist products
export async function getProductsWishlist(): Promise<GetFromWhishListResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: loggedToken,
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
}

// removing product from wishlist
export async function removeProductFromWishlist(
  productId: string
): Promise<RemoveFromWhishListResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + `${productId}`,
    {
      method: "delete",
      headers: {
        token: loggedToken,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => error);
}
