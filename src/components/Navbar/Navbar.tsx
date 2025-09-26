"use client";
import {
  CircleUser,
  Heart,
  Loader,
  LogOut,
  Menu,
  ShoppingCart,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  NavigationMenuList,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { CartContext } from "@/Contexts/CartContext";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

// Interface for NavLink
interface INavLink {
  name: string;
  path: string;
}
export default function Navbar() {
  const pathName = usePathname();
  const { cartCounter, isLoadingCart } = useContext(CartContext);

  const { status } = useSession();

  // NavBar links
  const navLinks: INavLink[] = [
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Brands",
      path: "/brands",
    },
  ];

  return (
    <>
      {/* <!-- navbar --> */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-xl ">
        <nav className=" shadow-lg px-10 ">
          <div className=" py-5  xl:px-12 flex justify-between w-full items-center bg-transparent">
            {/* Site Logo */}
            <Link
              href={"/"}
              className="font-bold text-3xl "
              style={{
                letterSpacing: "5px",
              }}
            >
              <span className="text-red-500 ">M</span>Shop
            </Link>

            {/* <!-- Nav Links --> */}
            <ul className="hidden md:flex px-4  font-semibold gap-5">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.name}
                    className={`bg-gray-50 cursor-pointer py-2 px-4 rounded-md transition-all duration-300 transform hover:bg-black hover:text-white hover:-translate-0.5 ${
                      pathName.startsWith(link.path) ? "active" : ""
                    }  `}
                  >
                    <Link href={link.path}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>

            {/* <!-- Header Icons --> */}
            <div className="flex items-center space-x-2 lg:space-x-4  ms-2">
              {status == "authenticated" ? (
                <>
                  {" "}
                  {/* /* wishlist link */}
                  <Link
                    href={"/wishlist"}
                    className="hover:cursor-pointer transform animate-bounce hover:animate-none text-red-500"
                  >
                    <Heart />
                  </Link>
                  {/* /* Cart link */}
                  <Link href={"/cart"} className="relative">
                    <ShoppingCart />
                    <span className="absolute -top-3 -right-3 rounded-full bg-red-100  text-primary text-[12px] size-5 font-semibold flex items-center justify-center ">
                      {isLoadingCart ? (
                        <Loader className="animate-spin" />
                      ) : (
                        cartCounter
                      )}
                    </span>
                  </Link>
                  {/* /* Navigation menu for logout and user profile */}
                  <NavigationMenu className=" text-black ">
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="cursor-pointer">
                          <CircleUser />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-full gap-4 ">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link
                                  href="/account"
                                  className="flex-row items-center gap-2"
                                >
                                  <UserPen className="text-green-500" />
                                  Account
                                </Link>
                              </NavigationMenuLink>

                              <NavigationMenuLink asChild>
                                <Button
                                  className="flex-row items-center gap-2 bg-transparent hover:bg-gray-100 text-black"
                                  onClick={() => {
                                    signOut({
                                      callbackUrl: "/login",
                                    });
                                  }}
                                >
                                  <LogOut className="text-red-500" />
                                  Logout
                                </Button>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </>
              ) : (
                <>
                  <Link href={"/login"} className="  hover:underline">
                    Login
                  </Link>
                  <Link href={"/register"} className="  hover:underline">
                    Register
                  </Link>
                </>
              )}

              {/* Navbar in small screens */}
              <NavigationMenu className=" text-black md:hidden ">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="cursor-pointer">
                      <Menu />
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid gap-1 ">
                        {navLinks.map((link) => {
                          return (
                            <li key={link.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={link.path}
                                  className={`flex items-center gap-2  ${
                                    pathName == link.path ? "active" : ""
                                  }`}
                                >
                                  {link.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
