"use client";

import Image from "next/image";
import React from "react";
import { Category } from "@/interfaces";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category }: { category: Category }) {
  const router = useRouter();
  return (
    <div
      className="category-group flex flex-col gap-2 items-center justify-center shadow-lg p-2 rounded-lg  cursor-pointer transform transition-all duration-500 hover:-translate-x-2.5 hover:-translate-y-2.5 bg-black/5"
      onClick={() => {
        router.push("/categories/" + `${category._id}`);
      }}
    >
      <div className="category-img relative w-40 h-40  rounded-md overflow-hidden">
        <Image
          src={category.image}
          alt="banner"
          fill
          className="absolute object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">{category.name}</h2>
    </div>
  );
}
