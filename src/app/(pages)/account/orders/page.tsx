"use client";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import { CartContext } from "@/Contexts/CartContext";
import { Order } from "@/interfaces";
import { getUserOrders } from "@/services/orders.services";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(CartContext);
  const { data, status } = useSession();

  //   Function to get all user orders
  async function fetchUserOrders() {
    setIsLoading(true);
    const response = await getUserOrders(userId);
    if (response.length != 0) {
      setOrders(response);
    } else {
      console.log("fe error");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    fetchUserOrders();
  }, [status, userId]);

  return (
    <>
      <div className=" bg-gray-100 p-6 rounded-lg">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Oders</h1>
        </div>

        {/* Order Cards */}
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div className="grid gap-4  l">
            <div className="w-full mx-auto p-4 space-y-4 h-70 overflow-y-scroll">
              {orders.reverse().map((order) => {
                return (
                  <div
                    key={order._id}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    {/* Left side: Order details */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID:{" "}
                        <Link
                          href={"/allorders/" + `${order._id}`}
                          className="hover:underline hover:text-blue-600"
                        >
                          <span className="font-medium">{order._id}</span>
                        </Link>
                      </p>

                      <p className="text-gray-700">
                        {order.shippingAddress?.details},
                        {order.shippingAddress?.city}
                      </p>
                      <p className="text-sm text-gray-500">
                        📞 {order.shippingAddress?.phone}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Right side: Total + Status */}
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <p className="text-lg font-semibold text-gray-800">
                        {order.totalOrderPrice.toFixed(2)} EGP
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
