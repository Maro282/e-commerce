import { ProductResponse, SingleProductResponse } from "@/types/responses";

// Getting all products
export async function getAllProducts(): Promise<ProductResponse> {
  // in fullfilled it will return promise
  return await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    cache: "force-cache",
    // next: {
    //   revalidate: 20,
    // },
  }).then((res) => {
    return res.json();
  });
}

//Getting single product
export async function getProductDetails(
  productId: string
): Promise<SingleProductResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + `${productId}`
  ).then((res) => res.json());
}

export async function getProductsWithCategory(
  categoryId: string
): Promise<ProductResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/products" +
      `?category[in]=${categoryId}`
  ).then((res) => {
    return res.json();
  });
}

// Get most sold products
export async function getMostSoldProducts(): Promise<ProductResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/products?sold[gte]=5000",
    {
      next: {
        revalidate: 20,
      },
    }
  ).then((res) => {
    return res.json();
  });
}

// Function to get products in price range
export async function getProductsInPriceRange(
  lessThan: number,
  greaterThan: number
): Promise<ProductResponse> {
  return await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?price[gte]=${greaterThan}&price[lte]=${lessThan}`
  ).then((res) => {
    return res.json();
  });
}
