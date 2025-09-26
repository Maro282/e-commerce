"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts, getProductsInPriceRange } from "@/services";
import { Product } from "@/interfaces";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import TogglingBtnOfDisplay from "@/components/Shared/TogglingBtnOfDisplay/TogglingBtnOfDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Products() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [lessThan, setLessThan] = useState<number>(0);
  const [greaterThan, setGreaterThan] = useState<number>(0);
  const [matchedProducts, setMatchedProducts] = useState<Product[] | []>([]);
  const [filterErrorMsg, setFilterErrorMsg] = useState("");
  const [isLoadingFilterBtn, setIsLoadingFilterBtn] = useState(false);

  // Function to fetch all products
  async function fetchProducts() {
    setIsLoading(true);
    const response = await getAllProducts();
    setProducts(response.data);
    setMatchedProducts(response.data);
    setIsLoading(false);
  }

  //  function to handle search products in price range
  async function handleSearchProductsWithPrice() {
    setFilterErrorMsg("");
    if (lessThan < greaterThan) {
      setFilterErrorMsg(
        "Please enter valid filter and sure you entered both fields"
      );
    } else {
      setIsLoadingFilterBtn(true);
      const response = await getProductsInPriceRange(lessThan, greaterThan);
      setMatchedProducts(response.data);
    }
    setIsLoadingFilterBtn(false);
  }

  // function to handle search by Product name
  function searchByProductName(productName: string) {
    productName = productName.trim().toLowerCase();
    const matchedProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(productName);
    });
    setMatchedProducts(matchedProducts);
  }

  function handleRemoveFromWishlist() {}

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="w-full mx-auto ">
      {/* Heading */}
      <div className="heading w-[90%] md:w-full mx-auto ">
        <h1 className="text-5xl mb-2">Products</h1>
        <p className="text-sm text-gray-500">
          Dicover amazing products from our collections
        </p>
      </div>

      <div
        className="flex
        mt-4
                w-[90%]
              
                mx-auto
                justify-between
                items-center

              "
      >
        {/* =================================================== */}

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className=" relative text-lg flex items-center justify-center bg-gray-50 mb-2  ">
              Filter Products
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex flex-col  gap-2 items-center w-full md:w-[50%] mx-auto shadow-xl px-4 py-2 rounded-lg  bg-white  mb-5   ">
                {/* Search by product name */}
                {/* Searching bar */}
                <div className="w-full   ">
                  <Input
                    type="text"
                    placeholder="Search by product name"
                    onChange={(e) => {
                      searchByProductName(e.target.value);
                    }}
                  />
                </div>
                {/* Search by price */}
                <div className="w-full">
                  <h2 className=" font-semibold self-start   mb-1">
                    Search by price
                  </h2>
                  <div className="grid grid-cols-2 w-full gap-2 items-center">
                    <div>
                      <Input
                        className="mt-2"
                        min={0}
                        type="number"
                        value={greaterThan}
                        placeholder="min price"
                        onChange={(e) => {
                          setGreaterThan(Number(e.target.value));
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        className="mt-2"
                        min={0}
                        type="number"
                        value={lessThan}
                        placeholder="max price"
                        onChange={(e) => {
                          setLessThan(Number(e.target.value));
                        }}
                      />
                    </div>
                  </div>
                </div>

                {filterErrorMsg && (
                  <p className="font-semibold ">{filterErrorMsg}</p>
                )}
                <div className=" self-end w-fit flex gap-2 items-center">
                  <Button
                    disabled={isLoadingFilterBtn}
                    onClick={() => {
                      handleSearchProductsWithPrice();
                    }}
                  >
                    {isLoadingFilterBtn ? (
                      <>
                        <Loader className="animate-spin" /> {"Filter"}{" "}
                      </>
                    ) : (
                      "Filter"
                    )}
                  </Button>
                  <Button
                    disabled={isLoadingFilterBtn}
                    onClick={() => {
                      setLessThan(0);
                      setGreaterThan(0);
                      setFilterErrorMsg("");
                      setMatchedProducts(products);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* =================================================== */}
      </div>

      {/* Togglling the display mode between list and grid */}
      <TogglingBtnOfDisplay viewMode={viewMode} setViewMode={setViewMode} />

      <div
        className={`${
          viewMode == "list"
            ? "grid w-[90%] md:w-full grid-cols-1 mx-auto gap-6"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 gap-y-7 items-stretch"
        } `}
      >
        {matchedProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              viewMode={viewMode}
              product={product}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
            />
          );
        })}
      </div>
    </div>
  );
}
