import { getLoggedUserCart } from "@/services/cart.services";
import { GetCartResponse } from "@/interfaces";

import CartInner from "@/components/Cart/CartInner/CartInner";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Cart() {
  const x = await getServerSession(nextAuthOptions);
  const cart: GetCartResponse = await getLoggedUserCart(x?.token ?? "");

  return (
    <div>
      <div className=" bg-gray-50 py-20 shadow-lg">
        <CartInner cartData={cart} />
      </div>
    </div>
  );
}
