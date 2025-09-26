import {
  BrandResponse,
  ProductResponse,
  SingleBrandResponse,
} from "@/types/responses";

// Get All Brands
export async function getAllbrands(): Promise<BrandResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/brands")
    .then((res) => res.json())
    .then((error) => error);
}

// Get Specific Brand
export async function GetSpesificBrand(
  brandId: string
): Promise<SingleBrandResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands/" + `${brandId}`
  )
    .then((res) => res.json())
    .then((error) => error);
}

// Get products accourding to brand id
export async function getProductsOfBrand(
  brandId: string
): Promise<ProductResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/products" + `?brand=${brandId}`
  ).then((res) => res.json());
}
