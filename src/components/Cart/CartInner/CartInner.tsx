"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import SubTotal from "../SubTotal/SubTotal";
import ProductCartCard from "../ProductCartCard/ProductCartCard";
import { Loader, ShoppingCart, Trash } from "lucide-react";
import { GetCartResponse } from "@/interfaces";
import {
  clearUserCart,
  getLoggedUserCart,
  removeProduct,
  updateProduct,
} from "@/services/cart.services";
import toast from "react-hot-toast";
import Link from "next/link";
import { CartContext } from "@/Contexts/CartContext";
import {  useSession } from "next-auth/react";

interface CartInnerProps {
  cartData: GetCartResponse;
}

export default function CartInner({ cartData }: CartInnerProps) {
  const [cart, setCart] = useState(cartData);
  const [clearCartIsLoading, setClearCartIsLoading] = useState(false);
  const { setCartCounter } = useContext(CartContext);
  const { data } = useSession();

  // Function to remove product from cart
  async function handleRemoveProduct(
    productId: string,
    setRemoveIsLoading: (value: boolean) => void
  ) {
    setRemoveIsLoading(true);
    const newCartData = await removeProduct(productId, data?.token ?? "");
    if (newCartData.status === "success") {
      toast.success("Product removed successfully", {
        position: "top-center",
      });
      setCart(newCartData);
    } else {
      toast.error(
        newCartData.message
          ? newCartData.message
          : "Something goes wrong try again later",
        {
          position: "top-center",
        }
      );
    }
    setRemoveIsLoading(false);
  }

  // Function to clear cart
  async function handleClearCart() {
    setClearCartIsLoading(true);
    const response = await clearUserCart(data?.token ?? "");
    if (response.message === "success") {
      toast.success("Cart Cleared successfully", {
        position: "top-center",
      });
      const newCartData = await getLoggedUserCart(data?.token ?? "");
      setCart(newCartData);
    } else {
      toast.error(
        response.message
          ? response.message
          : "Something goes wrong try again later",
        {
          position: "top-center",
        }
      );
    }
    setClearCartIsLoading(false);
  }

  // FUNCTION TO UPDATE QUANTITY
  async function handleUpdateProduct(productId: string, newQuantity: number) {
    const response = await updateProduct(
      productId,
      newQuantity,
      data?.token ?? ""
    );
    if (response.status == "success") {
      toast.success("Product updated successfully", {
        position: "top-center",
      });
      const newCartData = await getLoggedUserCart(data?.token ?? "");
      setCart(newCartData);
    } else {
      toast.error(
        response.message ? response.message : "Something goes wrong ",
        {
          position: "top-center",
        }
      );
    }
  }

  useEffect(() => {
    setCartCounter(cart.numOfCartItems);
  }, [cart]);

  return (
    <div>
      {cart.data.products.length == 0 ? (
        <div className="heading w-[90%] mx-auto mb-10 ">
          <div className="flex flex-col gap-3 items-center justify-center ">
            <h1 className="text-4xl mb-2 ">Cart is Empty .. </h1>
            <Button variant={"outline"} size={"lg"}>
              <Link href={"/products"}>Add ones</Link>
            </Button>{" "}
          </div>
        </div>
      ) : (
        <>
          {/* /* Heading */}
          <div className="heading w-[90%] mx-auto mb-10 ">
            <div className="flex gap-3 items-center ">
              <h1 className="text-4xl mb-2 ">Cart Items . .</h1>
              <ShoppingCart size={30} className="text-red-500" />
            </div>

            <p className="text-medium text-gray-500">
              There is ({cart?.numOfCartItems}) item
              {cart?.numOfCartItems == 1 ? "" : "s"} in your cart
            </p>
          </div>
          {/* //Cart Details */}
          <div className="mx-auto lg:w-full w-[90%] justify-center flex flex-col gap-5 lg:flex-row  ">
            {/* Cart Products side */}
            <div className="rounded-lg lg:w-[60%]">
              {cart?.data.products.map((item) => {
                return (
                  <ProductCartCard
                    item={item}
                    key={item._id}
                    handleRemoveProduct={handleRemoveProduct}
                    handleUpdateProduct={handleUpdateProduct}
                  />
                );
              })}
              <Button
                disabled={clearCartIsLoading}
                variant={"outline"}
                className="hover:bg-red-500 hover:text-white"
                onClick={() => {
                  handleClearCart();
                }}
              >
                {clearCartIsLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Trash />
                )}
                Clear Cart
              </Button>
            </div>
            {/* <!-- Sub total --> */}
            <SubTotal cart={cart} />
          </div>
        </>
      )}
    </div>
  );
}
