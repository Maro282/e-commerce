"use client";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import TogglingBtnOfDisplay from "@/components/Shared/TogglingBtnOfDisplay/TogglingBtnOfDisplay";
import { Product } from "@/interfaces";
import { getProductsOfBrand, GetSpesificBrand } from "@/services";
import { SingleBrandResponse } from "@/types/responses";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BrandDetails() {
  const { brandId } = useParams();
  const [brand, setBrand] = useState<SingleBrandResponse>();
  const [isLoadingBrand, setIsLoadingBrand] = useState(false);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [viewMode, setViewMode] = useState("grid");

  // Fetching the Brand
  async function fetchSpesificBrand(brandId: string) {
    setIsLoadingBrand(true);
    const response = await GetSpesificBrand(brandId);
    setBrand(response);
    setIsLoadingBrand(false);
  }

  // Fetching products of the brand
  async function fetchBrandProducts(brandId: string) {
    const response = await getProductsOfBrand(brandId);
    setProducts(response.data);
  }

  useEffect(() => {
    fetchSpesificBrand(String(brandId));
    fetchBrandProducts(String(brandId));
  }, []);

  return (
    <>
      {isLoadingBrand ? (
        <LoaderComponent />
      ) : (
        <div>
          {/* Heading */}
          <div className="heading w-[90%] md:w-full mx-auto  mb-8">
            <h1 className="text-4xl mb-2 p-2 bg-gray-100 rounded-lg w-fit border">
              {brand?.data.name}
            </h1>
            <p className="text-sm text-gray-500">
              Dicover amazing products from {brand?.data.name}
            </p>
          </div>

          {/* Products related to category */}

          {/* Togglling the display mode between list and grid */}
          <TogglingBtnOfDisplay viewMode={viewMode} setViewMode={setViewMode} />

          {products.length == 0 ? (
            <div className="">
              <p className="text-center text-lg text-gray-500">
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
                {products.map((product) => {
                  return (
                    <ProductCard
                      key={product._id}
                      viewMode={viewMode}
                      product={product}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
