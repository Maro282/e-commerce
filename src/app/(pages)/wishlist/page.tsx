"use client";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import TogglingBtnOfDisplay from "@/components/Shared/TogglingBtnOfDisplay/TogglingBtnOfDisplay";
import { Product } from "@/interfaces";
import { getProductsWishlist, removeProductFromWishlist } from "@/services";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function WishlistComponent() {
  const [wishlist, setWishlist] = useState<Product[] | []>();
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);

  // Function to get wishlist
  async function fetchWishlist() {
    setIsLoading(true);
    const response = await getProductsWishlist();
    if (response.status == "success") {
      setWishlist(response?.data);
    } else {
      toast.error("Something goes wrong ");
    }
    setIsLoading(false);
  }

  // Function handle remove from wishlist
  async function handleRemoveFromWishlist(productId: string) {
    const response = await removeProductFromWishlist(productId);
    if (response.status == "success") {
      toast.success(response.message ? response.message : "");
      const newWishlist = await getProductsWishlist();
      setWishlist(newWishlist?.data);
    } else {
      toast.error(response.message ? response.message : "");
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      <div className="w-full mx-auto ">
        <div className="heading w-[90%] md:w-full mx-auto ">
          <h1 className="text-5xl mb-2">Wishlist . . </h1>
          {wishlist?.length != 0 ? (
            <p className="text-sm text-gray-500 ">
              “You’ve got such an elegant style 👏”
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Togglling the display mode between list and grid */}
        <TogglingBtnOfDisplay viewMode={viewMode} setViewMode={setViewMode} />

        {wishlist?.length == 0 ? (
          <p className="text-gary-500 font-semibold text-lg text-center w-full ">
            There is no products added yet
          </p>
        ) : (
          <div
            className={`${
              viewMode == "list"
                ? "grid w-[90%] grid-cols-1 mx-auto gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 gap-y-7 items-stretch"
            } `}
          >
            {wishlist?.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  viewMode={viewMode}
                  product={product}
                  from={"wishlist"}
                  handleRemoveFromWishlist={handleRemoveFromWishlist}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
