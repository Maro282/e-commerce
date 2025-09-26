import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ResetPassword from "@/components/auth/ResetPassword/ResetPassword";
import { KeyRound, MapPinHouse, Receipt, UserRoundPen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = await getServerSession(nextAuthOptions);

  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-center  w-fit  ms-auto mb-5  ">
          <h1 className="text-xl font-bold text-gray-800">
            Welcome, {x?.user?.name} 👋
          </h1>
        </div>
        <div className="grid md:grid-cols-[1fr_3fr] lg:p-5 gap-y-6  ">
          <div className=" flex flex-col gap-3  border-s-4 rounded-lg px-2">
            <ul className="flex flex-col justify-center  gap-3">
              <li>
                <h3 className="text-xl font-semibold ">Manage my account</h3>
                <ul className="flex flex-col  gap-1 mt-2">
                  <li className="text-gray-500 flex gap-1 items-center ">
                    <UserRoundPen size={15} />
                    <Link href={"profile"} className="hover:underline">
                      My profile
                    </Link>
                  </li>
                  <li className="text-gray-500 flex gap-1 items-center ">
                    <KeyRound size={15} />
                    <ResetPassword />
                  </li>
                  <li className="text-gray-500 flex gap-1 items-center ">
                    <MapPinHouse size={15} />
                    <Link href={"address"} className="hover:underline">
                      Address book
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="text-xl font-semibold "> Orders</h3>
                <ul className="flex flex-col  mt-2">
                  <li className="text-gray-500 flex items-center gap-1 ">
                    <Receipt size={15} />
                    <Link href={"orders"} className="hover:underline">
                      My orders
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="text-xl font-semibold ">
                {" "}
                <Link href={"/wishlist"} className="hover:underline">
                  My wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div className=" shadow-2xl rounded-lg px-5 py-2"> {children}</div>
        </div>
      </div>
    </>
  );
}
