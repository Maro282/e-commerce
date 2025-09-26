"use client";
import BrandCard from "@/components/BrandCard/BrandCard";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import { Input } from "@/components/ui/input";
import { Brand } from "@/interfaces";
import { getAllbrands } from "@/services";

import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[] | []>([]);
  const [matchedBrands, setMatchedBrands] = useState<Brand[] | []>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);

  // Function to get all brands
  async function fetchBrands() {
    setIsLoadingBrands(true);
    const response = await getAllbrands();
    setBrands(response?.data);
    setMatchedBrands(response?.data);
    setIsLoadingBrands(false);
  }

  // function to handle search by brand name
  function searchByBrandName(brandName: string) {
    brandName = brandName.trim().toLowerCase();
    const matchedBrands = brands.filter((brand) => {
      return brand.name.toLowerCase().includes(brandName);
    });
    setMatchedBrands(matchedBrands);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      {isLoadingBrands ? (
        <LoaderComponent />
      ) : (
        <main className="container w-[90%] md:w-full ">
          {/* Heading */}
          <div className="heading w-[90%] md:w-full mx-auto  mb-15">
            <h1 className="text-5xl mb-2">Brands</h1>
            <p className="text-sm text-gray-500">
              From Fashion to Tech — We’ve Got It All{" "}
            </p>
          </div>

          {/* Searching bar */}
          <div className="flex w-full md:w-[50%] rounded-md border border-gray-200 bg-white  mb-5  me-5  ">
            <Input
              type="text"
              placeholder="Search by brand name"
              onChange={(e) => {
                searchByBrandName(e.target.value);
              }}
            />
          </div>

          {/* Brands layout */}
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4  gap-10">
            {matchedBrands.map((brand) => {
              return <BrandCard brand={brand} key={brand._id} />;
            })}
          </div>
        </main>
      )}
    </>
  );
}
