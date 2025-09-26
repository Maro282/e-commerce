import { Product } from "@/interfaces";
import { Star, StarHalf, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import ProductCardBtns from "./ProductCardBtns";
import toast from "react-hot-toast";
import { addToWhishList } from "@/services";

interface ProductProps {
  product: Product;
  viewMode?: string;
  from?: string;
  wishlisted?: boolean;
  handleRemoveFromWishlist: (value: string) => void;
}

export default function ProductCard({
  viewMode = "grid",
  product,
  from = "",
  wishlisted = false,
  handleRemoveFromWishlist,
}: ProductProps) {
  // Function to handle add product to whishList
  async function handleAddToWishlist(productId: string) {
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
  }

  if (viewMode == "list") {
    return (
      <>
        <div className=" flex md:flex-row flex-col  border rounded-md relative gap-7 p-3">
          {/* Icons */}
          {from ? (
            <X
              className=" absolute top-2 right-2 z-10 text-red-500 hover:text-red-800 hover:cursor-pointer hover:shadow-lg "
              onClick={() => {
                handleRemoveFromWishlist?.(product._id);
              }}
            />
          ) : (
            <ProductCardBtns
              productId={product._id}
              handleAddToWishlist={handleAddToWishlist}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
              viewMode={viewMode}
              wishlisted={wishlisted}
            />
          )}

          {/* product image */}
          <div className="product-img relative shrink-0 size-40 ">
            <Link href={"/products/" + `${product._id}`}>
              <Image
                src={product.imageCover}
                alt={product.description}
                fill
                className="absolute object-cover transform transition-all duration-200 hover:scale-[1.05] hover:cursor-pointer"
              />
            </Link>
          </div>
          {/* product details */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Product Name */}
            <Link href={"/products/" + `${product._id}`}>
              <h3 className="font-bold text-primary hover:underline underline-offset-1">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
            </Link>

            {/* Product Description */}
            <p className="line-clamp-2 text-gray-600 text-sm">
              {product.description}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-5">
              <div className="flex items-center  my-2  text-yellow-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                  <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                  <StarHalf className="w-4 h-4 fill-yellow-400 stroke-none" />
                </div>
                <span className="text-gray-600 text-xs ">
                  ({product.ratingsQuantity})
                </span>
              </div>
              {/* Sold */}
              <p className=" text-gray-500 mt-1 text-xs">
                Sold ({product.sold?.toString().replace(".", "").slice(0, 10)})
              </p>
            </div>

            {/* Product price */}
            <h3 className="font-bold  text-green-800">
              {product.price} <span className="text-xs">EGP</span>
            </h3>

            {/* Brand and Category and button */}
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center w-full">
              <div className="flex gap-3 w-full">
                {/* Product brand */}
                <Link href={"/brands/" + `${product.brand._id}`}>
                  <p className="text-sm hover:underline w-fit text-gray-600">
                    Brand : {product.brand.name}
                  </p>
                </Link>
                {/* Category Name */}
                <Link href={"/categories/" + `${product.category._id}`}>
                  <p className="text-sm w-fit text-gray-600 bg-gray-100 px-1 rounded-lg cursor-pointer hover:underline">
                    Category: {product.category.name}
                  </p>
                </Link>
              </div>
              <AddToCartBtn product={product} viewMode={viewMode} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" w-[90%] mx-auto sm:w-full rounded-md shadow-lg relative group bg-white border p-2 flex flex-col justify-between ">
        <div>
          {/* Popular Badge */}

          {product?.sold ?? 0 > 7000 ? (
            <span className="absolute top-3 left-2 bg-primary text-white text-xs px-3 py-1 rounded-full z-10">
              Popular
            </span>
          ) : (
            ""
          )}

          {/* Icons */}
          {from ? (
            <X
              className=" absolute top-2 right-2 z-10 text-red-500 hover:text-red-800 hover:cursor-pointer hover:shadow-xl "
              onClick={() => {
                handleRemoveFromWishlist?.(product._id);
              }}
            />
          ) : (
            <ProductCardBtns
              productId={product._id}
              handleAddToWishlist={handleAddToWishlist}
              handleRemoveFromWishlist={handleRemoveFromWishlist}
              viewMode={viewMode}
              wishlisted={wishlisted}
            />
          )}

          {/* Image */}
          <div className="overflow-hidden relative w-full h-[200px]">
            <Link href={"/products/" + `${product._id}`}>
              <Image
                src={product.imageCover}
                alt={product.description}
                fill
                className="absolute object-cover  transform transition-all duration-200 hover:scale-[1.05] hover:cursor-pointer"
              />
            </Link>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Product brand */}
            <Link href={"/brands/" + `${product.brand._id}`}>
              <p className="text-sm hover:underline w-fit text-gray-600">
                Brand : {product.brand.name}
              </p>
            </Link>

            {/* Product Name */}
            <Link href={"/products/" + `${product._id}`}>
              <h3 className="font-bold text-primary hover:underline underline-offset-1">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
            </Link>

            {/* Product Description */}
            <p className="line-clamp-2 text-gray-600 text-sm">
              {product.description}
            </p>

            {/* Ratings */}
            <div className="flex items-center my-2  text-yellow-400">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                <Star className="w-4 h-4 fill-yellow-400 stroke-none" />
                <StarHalf className="w-4 h-4 fill-yellow-400 stroke-none" />
              </div>
              <span className="text-gray-600 text-xs ">
                ({product.ratingsQuantity})
              </span>
            </div>

            {/* Category Name */}
            <Link href={"/categories/" + `${product.category._id}`}>
              <p className="text-sm w-fit text-gray-600 bg-gray-100 px-1 rounded-lg hover:underline ">
                Category: {product.category.name}
              </p>
            </Link>

            {/* Prody=uct Price & Sold */}
            <div className="flex justify-between my-2">
              {/* Product price */}
              <h3 className="font-bold text-green-800">
                {product.price} <span className="text-xs">EGP</span>
              </h3>

              {/* Sold */}
              <p className=" text-gray-500 mt-1 text-xs">
                Sold ({product.sold?.toString().replace(".", "").slice(0, 10)})
              </p>
            </div>
          </div>
        </div>
        <AddToCartBtn product={product} viewMode={viewMode} />
      </div>
    </>
  );
}
