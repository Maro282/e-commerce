"use client";

import Image from "next/image";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination module styles

import { Button } from "../ui/button";
import Link from "next/link";

export default function MainSlider() {
  return (
    <>
      {/* <Swiper
        autoplay
        loop={true}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="w-full h-[450px] relative">
            <Image src={banner1} alt="" fill className="absolute " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[70vh] relative">
            <Image src={banner2} alt="" fill className="absolute " />
          </div>
        </SwiperSlide>
      </Swiper> */}

      <div className="w-[90%] mx-auto text-center grid gap-8  py-10 px-5  lg:py-20 lg:px-10 bg-gray-50 rounded-lg  my-12   ">
        <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
          <h1 className="lg:text-5xl md:text-3xl text-2xl">Shop the Latest.</h1>
          <h1 className="lg:text-5xl md:text-3xl text-2xl"> Live the Best.</h1>
        </div>
        <p className="text-gray-700 md:text-lg lg:text-xl px-6 ">
          At{" "}
          <span className="bg-black text-white px-1 font-bold rounded me-1">
            M
          </span>
          shop, we believe shopping should be more than just buying things —
          it’s about discovering what inspires you. Explore trending
          collections, enjoy seamless checkout, and experience delivery that
          fits your lifestyle.
        </p>

        <div className="browse btn flex gap-5 items-center justify-center ">
          <Button className="lg:px-5 lg:py-6">
            <Link href={"/products"}>Discover Products</Link>
          </Button>
          <Button className="lg:px-5 lg:py-6">
            <Link href={"/categories"}> Search by category</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
