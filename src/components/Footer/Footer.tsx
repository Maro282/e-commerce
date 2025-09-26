import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import {
  Facebook,
  Instagram,
  Linkedin,
  SendHorizontal,
  Twitter,
} from "lucide-react";
import qr from "@/../public/images/qr.jpg";
import appStore from "@/../public/images/appStore.png";
import googlePlay from "@/../public/images/googlePlay.png";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Footer() {
  const footerSections = [
    {
      title: "Support",
      links: [
        { title: "10 khaled ibn waleed str", href: "/account" },
        { title: "marawanelsawy00@gmail.com", href: "/login" },
        { title: "+20 01275311282", href: "/cart" },
      ],
    },

    {
      title: "Account",
      links: [
        { title: "My account", href: "/account" },
        { title: "Login / Register", href: "/login" },
        { title: "Cart", href: "/cart" },
        { title: "Wishlist", href: "/wishlist" },
        { title: "shop", href: "/products" },
      ],
    },

    {
      title: "Quick links",
      links: [
        { title: "Privacy Policy", href: "#" },
        { title: "Terms Of Use", href: "#" },
        { title: "FAQ", href: "#" },
        { title: "Contact", href: "#" },
        { title: "shop", href: "/products" },
      ],
    },
  ];

  const socialLinks = [
    {
      title: "Facebook",
      href: "#",
    },

    {
      title: "Twitter",
      href: "#",
    },

    {
      title: "Instagram",
      href: "#",
    },

    {
      title: "Linkedin",
      href: "#",
    },
  ];

  return (
    <>
      <main className="flex justify-center bg-black p-5 lg:p-10 xl:p-20">
        <div className=" grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-y-4">
          {/* First section */}
          <div className="flex flex-col gap-2 ">
            <h2 className="text-white font-semibold text-xl  mb-1">
              Exclusive
            </h2>
            <p className="text-white font-semibold text-lg ">Subscribe</p>
            <p className="text-white text-sm  mt-5 ">
              Get 10% off your first order
            </p>
            <div className="flex items-center justify-center border px-3 rounded w-[80%] mt-5">
              <Input
                type="text"
                placeholder="Enter your email "
                className="border-0 bg-transparent rounded-none shadow-none  focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <SendHorizontal className="text-white cursor-pointer" />
            </div>
          </div>
          {/* Footer middle sections */}
          {footerSections.map((section, index) => {
            return (
              <div
                className="grid  gap-1 justify-start  text-white"
                key={index}
              >
                <h2 className="text-white font-semibold text-xl  mb-1">
                  {section.title}
                </h2>

                {section.links.map((link) => {
                  return (
                    <p
                      key={link.title}
                      className="p-1 flex   items-center text-gray-500 hover:text-white  transform transition-all duration-300 hover:cursor-pointer hover:shadow shadow-gray-100 hover:translate-x-1"
                    >
                      <Link href={link.href}>{link.title}</Link>
                    </p>
                  );
                })}
              </div>
            );
          })}

          {/* Footer last section */}
          <div className=" flex flex-col gap-2">
            <h2 className="text-white font-semibold text-xl  mb-1">
              Download App
            </h2>

            <div>
              <p className="text-white text-sm mb-2">
                Save $3 with App New User Only
              </p>
              <div className="grid grid-cols-2 gap-5 items-center ">
                <div className="relative w-30 h-30">
                  <Image
                    src={qr}
                    alt=" Site qr code"
                    fill
                    className="absolute object-cover "
                  />
                </div>
                <div className="grid gap-2">
                  <div className="relative w-full h-10 ">
                    <Image
                      src={googlePlay}
                      alt=" Site google play"
                      fill
                      className="absolute object-cover "
                    />
                  </div>
                  <div className="relative w-full h-10 p-2">
                    <Image
                      src={googlePlay}
                      alt=" Site google play"
                      fill
                      className="absolute object-cover "
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Social links */}
            <div className="flex gap-2 items-center mt-2">
              <Button
                variant={"ghost"}
                className="hover:bg-gray-50 hover:text-black text-white"
              >
                <Link href={"/facebook"} target="_blank">
                  <Facebook className="h-4 h-4" />
                </Link>
              </Button>
              <Button
                variant={"ghost"}
                className="hover:bg-gray-50 hover:text-black text-white"
              >
                <Link href={"/facebook"} target="_blank">
                  <Twitter className="h-4 h-4" />
                </Link>
              </Button>

              <Button
                variant={"ghost"}
                className="hover:bg-gray-50 hover:text-black text-white"
              >
                <Link href={"/facebook"} target="_blank">
                  <Instagram className="h-4 h-4" />
                </Link>
              </Button>
              <Button
                variant={"ghost"}
                className="hover:bg-gray-50 hover:text-black text-white"
              >
                <Link href={"/facebook"} target="_blank">
                  <Linkedin className="h-4 h-4 " />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
