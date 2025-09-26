"use client";
import { CategoryResponse } from "@/types/responses";
import React from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import CategoryCard from "../CategoryCard/CategoryCard";
import { Button } from "../ui/button";
import Link from "next/link";

export default function BrowseByCategory({
  categories,
}: {
  categories: CategoryResponse;
}) {
  return (
    <>
      <div className=" py-8 w-[90%] mx-auto">
        <h2 className=" relative   ps-5 text-3xl font-bold mb-6 before:content-[''] before:h-full before:w-[10px] before:rounded before:bg-black before:absolute before:left-0  ">
          <p>Browse By Category</p>
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
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {categories.data.map((category) => {
            return (
              <SwiperSlide key={category._id} className="py-5">
                <CategoryCard category={category} key={category._id} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="w-fit mx-auto mt-5">
          <Button className=" mx-auto p-6">
            <Link href={"/categories"}>View All Categories</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
