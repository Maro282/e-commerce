import { Button } from "@/components/ui/button";
import { GetCartResponse } from "@/interfaces";
import { HandCoins, Undo2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ISubTotal {
  cart: GetCartResponse;
}
export default function SubTotal({ cart }: ISubTotal) {
  return (
    <div className=" h-fit rounded-lg border bg-white p-6 shadow-md lg:w-1/3 sticky top-20">
      <div className="mb-2 flex justify-between">
        <p className="font-bold text-lg text-gray-700">
          Subtotal (
          {`${cart.numOfCartItems} item${cart.numOfCartItems == 1 ? "" : "s"}`})
        </p>
        <p className="font-semibold text-lg text-gray-700">
          {cart.data.totalCartPrice} EGP
        </p>
      </div>

      <div className="mb-2 flex justify-between">
        <p className="font-bold text-lg text-gray-700">Shipping</p>
        <p className="font-semibold text-lg text-green-500">Free</p>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">
            {cart.data.totalCartPrice} EGP
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-6">
        <Button className=" w-full rounded-md py-1.5 font-medium text-blue-50 hover:bg-blue-500 bg-blue-600">
          <Link href={"/payment"} className="flex gap-2">
            {" "}
            <HandCoins /> Go to Checkout
          </Link>
        </Button>
        <Button className=" w-full rounded-md py-1.5 font-medium  text-white ">
          <Link href={"/products"} className="flex gap-2">
            <Undo2 /> Back To Shoping
          </Link>
        </Button>
      </div>
    </div>
  );
}
