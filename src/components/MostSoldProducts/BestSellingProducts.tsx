"use client";
import { ProductResponse } from "@/types/responses";
import React from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../products/ProductCard/ProductCard";
import { Button } from "../ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

export default function MostSoldProducts({
  mostSoldProducts,
}: {
  mostSoldProducts: ProductResponse;
}) {
  return (
    <>
      <div className=" py-8 w-[90%] mx-auto">
        <h2 className=" relative   ps-5 text-3xl font-bold mb-6 before:content-[''] before:h-full before:w-[10px] before:rounded before:bg-black before:absolute before:left-0  ">
          <p>Best Selling Products </p>
        </h2>
        <Swiper
          scrollbar={{}}
          modules={[Navigation, Pagination, Autoplay, Scrollbar]}
          className="mySwiper"
          loop
          spaceBetween={20}
          // slidesPerView={4}
          navigation
          simulateTouch={true} // allows swipe with finger or mouse drag
          touchRatio={1}
          // className="w-full"
          breakpoints={{
            0: {
              slidesPerView: 1, // 📱 mobile
            },
            640: {
              slidesPerView: 2, // 📱 bigger phones / small tablets
            },
            1024: {
              slidesPerView: 3, // 💻 tablets / small desktops
            },
            1280: {
              slidesPerView: 4, // 🖥️ large screens
            },
          }}
        >
          {mostSoldProducts.data.map((product) => {
            return (
              <SwiperSlide key={product._id} className="py-5">
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="w-fit mx-auto mt-5">
          <Button className=" mx-auto p-6">
            <Link href={"/products"}>View All Products</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
