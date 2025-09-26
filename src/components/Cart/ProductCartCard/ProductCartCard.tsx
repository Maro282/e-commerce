"use client";
import { Button } from "@/components/ui/button";
import { CartProduct, Product } from "@/interfaces";
import { clear } from "console";
import { Loader, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Interface
interface ProductCartCardProps {
  item: CartProduct<Product>;
  handleRemoveProduct: (
    productId: string,
    setRemoveIsLoading: (value: boolean) => void
  ) => void;
  handleUpdateProduct: (
    productId: string,
    newQuantity: number
  ) => Promise<void>; // عشان اقدر استخدم await  تحت
}

export default function ProductCartCard({
  item,
  handleRemoveProduct,
  handleUpdateProduct,
}: ProductCartCardProps) {
  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [productCount, setProductCount] = useState(item.count);
  const [updateReqId, setUpdateReqId] = useState<NodeJS.Timeout>();

  // handle increase & decrease
  function handleUpdateProductQuantity(newQuantity: number) {
    setProductCount(newQuantity);
    clearTimeout(updateReqId);
    const id = setTimeout(() => {
      handleUpdateProduct(item.product._id, newQuantity);
    }, 1000);
    setUpdateReqId(id);
  }

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-5 shadow-lg flex flex-col md:flex-row sm:justify-start gap-x-2 gap-y-5">
      {/* product image */}
      <div className="relative md:w-40 md:h-20 w-full h-50  rounded-lg overflow-hidden">
        <Image
          src={item.product.imageCover}
          fill
          alt="image"
          className="absolute object-contain"
        />
      </div>
      {/* Product details */}
      <div className="sm:ml-4 flex w-full justify-between ">
        {/* Left side */}
        <div className="mt-5 sm:mt-0">
          <Link
            href={"/products/" + `${item.product._id}`}
            className="hover:underline"
          >
            <h2 className="text-lg font-bold text-primary">
              {item.product.title}
            </h2>
          </Link>
          <p className="mt-1 text-sm bg-gray-100 text-gray-500 w-fit px-2 rounded">
            {/* {item.product.brand.name} */}
            {item.product.brand.name}
          </p>

          <h3 className="font-bold  text-green-800 mt-2">
            {item.price} <span className="text-xs">EGP</span>
          </h3>
        </div>

        {/* Right side */}
        <div className="mt-4 flex flex-col justify-between items-end   sm:space-y-6 sm:mt-0  ">
          {/* Close Btn */}
          <div className="flex  w-fit space-x-4 ms-auto ">
            {removeIsLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <Trash2
                size={18}
                className="text-red-500 hover:cursor-pointer transform  hover:scale-[1.1] transition-all duration-300"
                onClick={() => {
                  handleRemoveProduct(item.product._id, setRemoveIsLoading);
                }}
              />
            )}
          </div>

          {/* Increase Decrease Btns */}
          <div className="flex items-center border-gray-100">
            <Button
              disabled={productCount == 1}
              variant={"outline"}
              className={`flex items-center rounded-none justify-center h-7 cursor-pointer rounded-l-lg bg-gray-100  duration-100 hover:bg-red-500 hover:text-blue-50 `}
              onClick={() => {
                handleUpdateProductQuantity(productCount - 1);
              }}
            >
              <Minus size={15} />
            </Button>

            <p className="h-7 w-8 border-t  bg-white text-center text-xs flex items-center justify-center font-bold ">
              {productCount}
            </p>

            <Button
              disabled={productCount == item.product.quantity}
              variant={"outline"}
              className="flex items-center justify-center h-7 rounded-none  cursor-pointer rounded-r-lg bg-gray-100  duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => {
                handleUpdateProductQuantity(productCount + 1);
              }}
            >
              <Plus size={15} />
            </Button>
          </div>

          {/* Total price of the item */}
          <p className="font-semibold">
            Total :{" "}
            <span className="font-normal">
              {item.count * item.price} <sub className="font-semibold">EGP</sub>
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
