import {
  CategoryResponse,
  ProductResponse,
  SingleCategoryResponse,
} from "@/types/responses";

// Get All Categories
export async function getAllCategories(): Promise<CategoryResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    .then((res) => res.json())
    .then((error) => error);
}

// Get Specific Category
export async function GetSpesificCategory(
  categoryId: string
): Promise<SingleCategoryResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories/" + `${categoryId}`
  )
    .then((res) => res.json())
    .then((error) => error);
}

// Get products accourding to category id
export async function getProductsOfCategory(
  categoryId: string
): Promise<ProductResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/products" +
      `?category[in]=${categoryId}`
  ).then((res) => res.json());
}
