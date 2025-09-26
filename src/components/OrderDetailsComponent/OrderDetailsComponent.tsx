import { Order } from "@/interfaces";
import Image from "next/image";
import React from "react";
import LoaderComponent from "../Shared/LoaderComponent/LoaderComponent";
import { Button } from "../ui/button";
import Link from "next/link";
export default function OrderDetailsComponent({
  orderDetails,
}: {
  orderDetails: Order | null;
}) {
  if (!orderDetails) {
    return <LoaderComponent />;
  }

  return (
    <>
      <Button className="bm-2 ">
        <Link href={"/account/orders"}>Back to orders</Link>
      </Button>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mx-auto">
        {/* Order Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order #{orderDetails._id}</h2>
            <p className="text-sm text-gray-500">
              Placed on {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              orderDetails.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {orderDetails.isDelivered ? "Delivered" : "Processing"}
          </span>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
          <p className="text-gray-700">
            {orderDetails.shippingAddress.details}
            <br />
            {orderDetails.shippingAddress.city}
            <br />
            {orderDetails.shippingAddress.phone}
          </p>
        </div>

        {/* Cart Items */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Products</h3>
          <ul className="space-y-4">
            {orderDetails.cartItems.map((item) => (
              <li
                key={item._id}
                className=" flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={50}
                  height={50}
                  className="rounded-lg   border object-contain"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.count}</p>
                </div>
                <p className="font-semibold">{item.price.toFixed(2)} EGP</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
          <div className="flex justify-between text-gray-600 mb-1">
            <span>Tax</span>
            <span>{orderDetails.taxPrice.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-1">
            <span>Shipping</span>
            <span>{orderDetails.shippingPrice.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-2">
            <span>Total</span>
            <span>{orderDetails.totalOrderPrice.toFixed(2)} EGP</span>
          </div>
        </div>
      </div>
    </>
  );
}
