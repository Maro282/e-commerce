"use client";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import TogglingBtnOfDisplay from "@/components/Shared/TogglingBtnOfDisplay/TogglingBtnOfDisplay";
import { Brand, Product } from "@/interfaces";
import {
  getAllbrands,
  getProductsOfCategory,
  GetSpesificCategory,
} from "@/services";
import { SingleCategoryResponse } from "@/types/responses";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<SingleCategoryResponse>();
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [matchedProducts, setMatchedProducts] = useState<Product[] | []>([]);
  const [viewMode, setViewMode] = useState("grid");
  const [brands, setBrands] = useState<Brand[] | []>([]);

  // Fetching the category
  async function fetchSpesificCategory(categoryId: string) {
    setIsLoadingCategory(true);
    const response = await GetSpesificCategory(categoryId);
    setCategory(response);
    setIsLoadingCategory(false);
  }

  // Fetching products of the category
  async function fetchCategoryProducts(categoryId: string) {
    const response = await getProductsOfCategory(categoryId);
    setProducts(response.data);
    setMatchedProducts(response.data);
  }

  // fetching prodcts acourding to brand
  async function fetchBrands() {
    const response = await getAllbrands();
    setBrands(response.data);
  }

  // Handle filter by brand
  function handleChangeOfFilter(brandName: string) {
    brandName = brandName.trim().toLowerCase();
    if (brandName.length == 0) {
      setMatchedProducts(products);
    } else {
      const matchedProductsArr = products.filter((product) =>
        product.brand.name.toLowerCase().includes(brandName)
      );
      setMatchedProducts(matchedProductsArr);
    }
  }

  useEffect(() => {
    fetchSpesificCategory(String(categoryId));
    fetchCategoryProducts(String(categoryId));
    fetchBrands();
  }, []);

  return (
    <>
      {isLoadingCategory ? (
        <LoaderComponent />
      ) : (
        <div>
          {/* Heading */}
          <div className="heading w-[90%] md:w-full mx-auto  mb-8 flex gap-1.5">
            <div className="category-name h-28 w-38 relative ">
              <Image
                src={category ? category.data.image : ""}
                alt={category ? category.data.name : ""}
                fill
                className="absolute object-cover "
              />
            </div>
            <div className="category-description">
              {" "}
              <h1 className="text-4xl mb-2 p-2 bg-gray-100 rounded-lg w-fit border">
                {category?.data.name}
              </h1>
              <p className="text-sm text-gray-500">
                Dicover amazing products from {category?.data.name}
              </p>
            </div>
          </div>

          {/* Products related to category */}

          <div
            className="flex
                w-[90%]
                mx-auto
                justify-between
                items-center

              "
          >
            {/* Searching Bar */}
            <div className="flex w-full md:w-[50%] rounded-md border border-gray-200 bg-white  mb-5  me-5  ">
              <Select onValueChange={handleChangeOfFilter}>
                <SelectTrigger className="w-full rounded-r-none">
                  <SelectValue placeholder="Filter by brand" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-primary font-semibold text-md">
                      Brands
                    </SelectLabel>
                    {brands?.map((brand) => {
                      return (
                        <SelectItem
                          key={brand._id}
                          value={brand.name}
                          className=" hover:cursor-pointer  text-primary"
                        >
                          {brand.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                className="rounded-l-none"
                onClick={() => {
                  handleChangeOfFilter("");
                }}
              >
                Clear Filter
              </Button>
            </div>

            {/* Togglling the display mode between list and grid */}
            <TogglingBtnOfDisplay
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>

          {products.length == 0 ? (
            <div className="text-center">
              <p className="text-gray-500 rounded border shadow-lg px-2 py-x w-fit mx-auto">
                There is no products yet
              </p>
            </div>
          ) : (
            <>
              <div
                className={`${
                  viewMode == "list"
                    ? "grid w-[90%] grid-cols-1 mx-auto gap-6"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 gap-y-7"
                } `}
              >
                {matchedProducts.length == 0 ? (
                  <p className="text-gray-500 bg-gray-100 rounded border shadow-lg px-2 py-x w-fit ">
                    No match products
                  </p>
                ) : (
                  matchedProducts.map((product) => {
                    return (
                      <ProductCard
                        key={product._id}
                        viewMode={viewMode}
                        product={product}
                      />
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
