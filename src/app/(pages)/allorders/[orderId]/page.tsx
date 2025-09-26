"use client";
import OrderDetailsComponent from "@/components/OrderDetailsComponent/OrderDetailsComponent";
import { CartContext } from "@/Contexts/CartContext";
import { Order } from "@/interfaces";
import { getUserOrders } from "@/services/orders.services";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function OrderDetails() {
  const { data, status } = useSession();
  const { orderId } = useParams();
  const [myOrder, setMyOrder] = useState<Order | null>(null);
  const { userId } = useContext(CartContext);

  //   Function to get all user orders
  async function fetchUserOrders() {
    const response = await getUserOrders(userId);
    if (response.length != 0) {
      const requiredOrder = response.find((order) => order._id == orderId);
      setMyOrder(requiredOrder!);
      console.log("user id ", userId);
    }
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!userId || !orderId) return; // wait until both exist

    fetchUserOrders();
  }, [status, userId, orderId]);

  return <OrderDetailsComponent orderDetails={myOrder} />;
}
