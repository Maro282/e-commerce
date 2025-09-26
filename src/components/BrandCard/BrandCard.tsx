"use client";
import Image from "next/image";
import React from "react";
import { Brand } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function CategoryCard({ brand }: { brand: Brand }) {
  const router = useRouter();
  return (
    <div
      className="category-group flex flex-col gap-2 items-center justify-center shadow-lg p-2 rounded-lg  cursor-pointer transform transition-all duration-500 hover:-translate-x-2.5 hover:-translate-y-2.5 bg-black/5"
      onClick={() => {
        router.push("/brands/" + `${brand._id}`);
      }}
    >
      <div className="category-img relative w-40 h-40  rounded-md overflow-hidden">
        <Image
          src={brand.image}
          alt="banner"
          fill
          className="absolute "
        />
      </div>
      <h2 className="text-lg font-semibold">{brand.name}</h2>
    </div>
  );
}
