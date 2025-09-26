"use client";
import { verifyToken } from "@/services/auth.services";
import { getLoggedUserCart } from "@/services/cart.services";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

//  cart counter interface
interface ICartCounter {
  cartId: string;
  userId: string;
  cartCounter: number;
  setCartCounter: Dispatch<SetStateAction<number>>;
  isLoadingCart: boolean;
}

export const CartContext = createContext<ICartCounter>({
  cartId: "",
  userId: "",
  cartCounter: 0,
  setCartCounter: () => {},
  isLoadingCart: false,
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCounter, setCartCounter] = useState(0);
  const [cartId, setCartId] = useState("");
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [userId, setUserId] = useState("");

  const { data, status } = useSession();

  // Get cart for the first time
  async function getCart() {
    setIsLoadingCart(true);
    const response = await getLoggedUserCart(data?.token ?? "");
    setCartCounter(response.numOfCartItems);
    setCartId(response.cartId);
    setIsLoadingCart(false);
  }

  //   Function to verify user token
  async function handleUserId() {
    const response = await verifyToken(data?.token ?? "");
    if (response.message == "verified") {
      setUserId(response.decoded.id);
    }
  }

  useEffect(() => {
    if (status !== "authenticated") return;

    handleUserId();
    getCart();
  }, [cartCounter, status]);

  return (
    <CartContext.Provider
      value={{ cartCounter, cartId, setCartCounter, isLoadingCart, userId }}
    >
      {children}
    </CartContext.Provider>
  );
}
