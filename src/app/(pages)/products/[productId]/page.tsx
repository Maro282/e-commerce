"use client";
import AddToCartBtn from "@/components/products/AddToCartBtn/AddToCartBtn";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/interfaces";
import {
  addToWhishList,
  getProductDetails,
  getProductsWithCategory,
} from "@/services";
import { SingleProductResponse } from "@/types/responses";
import {
  Grid3x2,
  Heart,
  Loader,
  Star,
  StarHalf,
  TextAlignJustify,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { productId } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<SingleProductResponse | null>(
    null
  );
  const [silimars, setSilimars] = useState<Product[] | []>([]);
  const [SimilarsIsLoading, setSimilarsIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("");
  const [isLoadingAddToWishlist, setIsLoadingAddToWishlist] = useState(false);

  // Get product details
  async function fetchProductDetails(productId: string) {
    setIsLoading(true);
    const product: SingleProductResponse = await getProductDetails(productId);
    setProductData(product);
    setActiveImage(product?.data.imageCover);
    setIsLoading(false);
  }

  //  Get product similars
  async function fetchSilimarProducts(categoryId: string) {
    setSimilarsIsLoading(true);
    const products = await getProductsWithCategory(categoryId);
    const data = products.data.filter(
      (product) => product._id != productData?.data._id
    );
    setSilimars(data);
    setSimilarsIsLoading(false);
  }

  // Function to handle add product to whishList
  async function handleAddToWishlist(productId: string) {
    setIsLoadingAddToWishlist(true);
    const response = await addToWhishList(productId);
    if (response.status === "success") {
      toast.success(
        response.message
          ? response.message
          : "Product Added successfully to wishlist",
        {
          position: "top-center",
        }
      );
    } else {
      toast.error("Something goes wrong .. ");
    }
    setIsLoadingAddToWishlist(false);
  }

  function handleRemoveFromWishlist() {}

  useEffect(() => {
    if (productData == null) {
      fetchProductDetails(String(productId));
    }
    if (productData !== null) {
      fetchSilimarProducts(productData.data.category._id);
    }
  }, [productData]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (!productData) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">Product not found</p>
            <Button
              onClick={() => {
                window.history.back();
              }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 gap-30">
        {/* Displaying Product Details */}

        <div>
          <div className="heading w-[90%] md:w-full mx-auto mb-10 ">
            <h1 className="text-4xl mb-2 ">Product Dtails .. </h1>
            <p className="text-sm text-gray-500">
              hoping it matches what you are looking for
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_5fr_5fr] gap-5 items-center">
            {/* Product thumbnails */}
            <div
              className={`flex flex-row md:flex-col gap-3 justify-center items-center order-2 md:order-1 `}
            >
              {productData?.data.images.slice(0, 4).map((image) => {
                return (
                  <div
                    className={`relative w-full h-25 rounded-lg overflow-hidden border ${
                      activeImage == image ? "border-red-600" : ""
                    }`}
                    key={image}
                  >
                    <Image
                      src={image}
                      alt={productData.data.description}
                      fill
                      className={`absolute object-cover hover:cursor-pointer transform transition-all hover:scale-[1.05] `}
                      onClick={() => {
                        setActiveImage(image);
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Main Image */}
            <div className="relative w-60 h-60 mx-auto md:w-full md:h-96 shadow-lg rounded-lg order-1  md:order-2">
              <Image
                src={activeImage}
                alt={`${productData?.data.description}`}
                className="absolute object-cover  "
                fill
              />
            </div>

            {/* Product Info */}
            <div className=" relative order-3 md:order-3">
              {/* Product Brand */}
              <Link href={"/brands"}>
                <p className="text-lg hover:underline w-fit text-gray-600">
                  {productData?.data.brand.name}
                </p>
              </Link>

              {/* Product Name */}
              <h1 className="text-2xl font-bold text-gray-800">
                {productData?.data.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center mt-3 space-x-1 text-yellow-400">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 stroke-none"
                  />
                ))}
                <StarHalf className="w-5 h-5 fill-yellow-400 stroke-none" />
                <span className="text-gray-600 text-sm ml-2">
                  ({productData?.data.ratingsQuantity} Reviewers)
                </span>{" "}
                {" | "}
                {productData?.data.quantity ?? 0 > 20 ? (
                  <span className="text-green-600 ms-1"> in stock</span>
                ) : (
                  <span className="text-red-500 ms-1">out of stock</span>
                )}
                {/* Sold */}
                <p className="text-sm text-gray-500 ms-2">
                  Sold: {productData?.data.sold}
                </p>
              </div>

              {/* Product Price */}
              <p className="text-primary text-3xl font-semibold mt-2">
                {productData?.data.price} <span className="text-sm">EGP</span>
              </p>

              {/* Description */}
              <p className="text-gray-700 mt-4">
                {productData?.data.description}
              </p>

              <Separator className="my-3   border-[0.5px] border-gray-400" />

              {/* Categories & Sub */}
              <div>
                <Link href={"/categories"}>
                  <h3 className="text-primary text-lg font-semibold mb-1.5 underline">
                    Categories{" "}
                  </h3>
                </Link>
                <div className="flex gap-1.5">
                  {/* Category Name */}

                  <p className="text-sm w-fit text-gray-600 bg-gray-100 px-1 rounded-lg">
                    {productData?.data?.category.name}
                  </p>
                  {productData?.data.subcategory.map((sub, index) => {
                    return (
                      <p
                        className="text-sm w-fit text-gray-600 bg-gray-100 px-1 rounded-lg"
                        key={index}
                      >
                        {sub.name}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 ">
                <AddToCartBtn viewMode={viewMode} product={productData.data} />
              </div>

              <div className="absolute top-0 right-3 z-10 transform transition-all duration-300 hover:scale-[1.05] hover:cursor-pointer hover:text-red-500">
                {isLoadingAddToWishlist ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Heart
                    size={20}
                    onClick={() => {
                      handleAddToWishlist(String(productId));
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Displaying Similar Products */}
        <div>
          {SimilarsIsLoading ? (
            <LoaderComponent />
          ) : (
            <>
              <div className="heading w-[90%] md:w-full mx-auto ">
                <h1 className="text-4xl mb-2">You May Like .. </h1>
                <p className="text-sm text-gray-500">
                  Dicover amazing Similar products
                </p>
              </div>
              {/* Togglling the display mode between list and grid */}
              <div className="flex w-fit rounded-md border border-gray-200 bg-white  mb-5 ms-auto me-5  ">
                <div
                  className={` ${
                    viewMode == "list"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } flex justify-center items-center p-1 rounded-s-md hover:cursor-pointer`}
                  onClick={() => {
                    setViewMode("list");
                  }}
                >
                  <TextAlignJustify />
                </div>
                <div
                  className={`${
                    viewMode == "grid"
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
                  } flex justify-center items-center p-1 rounded-e-md hover:cursor-pointer`}
                  onClick={() => {
                    setViewMode("grid");
                  }}
                >
                  <Grid3x2 />
                </div>
              </div>

              {/* Smililar Products */}
              <div
                className={`${
                  viewMode == "list"
                    ? "grid w-[90%] grid-cols-1 mx-auto gap-6"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3.5"
                } `}
              >
                {silimars == null
                  ? "There is no products in the same category"
                  : silimars?.length > 4
                  ? silimars?.slice(0, 4).map((product: Product) => {
                      return (
                        <ProductCard
                          viewMode={viewMode}
                          product={product}
                          key={product._id}
                          handleRemoveFromWishlist={handleRemoveFromWishlist}
                        />
                      );
                    })
                  : silimars?.map((product: Product) => {
                      return (
                        <ProductCard
                          viewMode={viewMode}
                          product={product}
                          key={product._id}
                          handleRemoveFromWishlist={handleRemoveFromWishlist}
                        />
                      );
                    })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
