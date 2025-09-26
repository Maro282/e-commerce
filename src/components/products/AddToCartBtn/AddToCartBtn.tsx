"use client";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/Contexts/CartContext";
import { Product } from "@/interfaces";
import { addProductToCart } from "@/services/cart.services";
import { Loader, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function AddToCartBtn({
  product,
  viewMode,
}: {
  product: Product;
  viewMode: string;
}) {
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const { setCartCounter } = useContext(CartContext);

  const { data, status } = useSession();

  // Handle add product to cart
  async function handleAddToCart(productId: string) {
    setAddToCartLoading(true);
    const response = await addProductToCart(productId, data?.token ?? "");
    setCartCounter(response.numOfCartItems);
    if (response.status == "success") {
      toast.success(response.message ? response.message : "", {
        position: "top-center",
      });
    } else {
      response.message = "Something went wrong";
      toast.error(response.message, {
        position: "top-center",
      });
    }
    setAddToCartLoading(false);
  }

  if (status == "authenticated") {
    return (
      <Button
        className={`px-6 py-3 text-white rounded-md self-end ${
          viewMode == "list" ? "w-full md:w-fit" : " w-full"
        } `}
        disabled={addToCartLoading || product.quantity == 0}
        onClick={() => {
          handleAddToCart(product._id);
        }}
      >
        {addToCartLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <ShoppingCart />
        )}
        Add to Cart
      </Button>
    );
  }
}
