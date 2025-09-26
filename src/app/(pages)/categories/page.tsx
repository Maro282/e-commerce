import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { getAllCategories } from "@/services";

import React from "react";

export default async function Categories() {
  const response = await getAllCategories();

  return (
    <>
      <main className="container w-[90%] md:w-full ">
        {/* Heading */}
        <div className="heading w-[90%] md:w-full mx-auto  mb-15">
          <h1 className="text-5xl mb-2">Categories</h1>
          <p className="text-sm text-gray-500">
            From Fashion to Tech — We’ve Got It All{" "}
          </p>
        </div>

        {/* Categories layout */}
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4  gap-10">
          {response.data.map((category) => {
            return <CategoryCard category={category} key={category._id} />;
          })}
        </div>
      </main>
    </>
  );
}
