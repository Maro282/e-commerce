"use client";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Loader } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// ProductCardBtnsProps
interface ProductCardBtnsProps {
  productId: string;
  viewMode: string;
  wishlisted: boolean;
  handleAddToWishlist: (value: string) => void;
  handleRemoveFromWishlist: (value: string) => void;
}

export default function ProductCardBtns({
  productId,
  handleAddToWishlist,
  viewMode,
}: ProductCardBtnsProps) {
  const [isLoadingAddToWishlist, setIsLoadingAddToWishlist] = useState(false);

  // Handle Add loading
  async function handleAddLoading() {
    setIsLoadingAddToWishlist(true);
    await handleAddToWishlist(productId);
    setIsLoadingAddToWishlist(false);
  }

  if (viewMode == "list") {
    return (
      <div className="flex flex-col items-center gap-5 absolute top-2 right-2 z-10 hover:bg-black/20 hover:shadow-lg p-1 rounded-full ">
        <Button
          className={`flex justify-center items-center rounded-full shadow hover:cursor-pointer transition duration-200 text-black bg-white hover:text-white hover:bg-red-500 p-1 `}
          onClick={() => {
            handleAddLoading();
          }}
        >
          {isLoadingAddToWishlist ? (
            <Loader className="animate-spin" />
          ) : (
            <Heart size={18} />
          )}
        </Button>

        <Link
          href={`/products/${productId}`}
          className="flex justify-center items-center rounded-full shadow hover:cursor-pointer text-sky-800 font-semibold bg-white p-1  "
        >
          <Eye size={18} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5 absolute top-2 right-2 z-10  hover:shadow-lg p-1 rounded-full bg-white">
        {isLoadingAddToWishlist ? (
          <Loader className="animate-spin" />
        ) : (
          <Heart
            size={20}
            className="hover:cursor-pointer hover:text-red-500"
            onClick={() => {
              handleAddLoading();
            }}
          />
        )}

        <Link
          href={`/products/${productId}`}
          className="flex justify-center items-center rounded-full shadow hover:cursor-pointer hover:text-sky-800 font-semibold "
        >
          <Eye size={20} />
        </Link>
      </div>
    </>
  );
}
