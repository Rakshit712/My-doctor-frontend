import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const SwiperComponent = ({ buttons }) => {
  return (
    <Swiper
      loop={false}
      pagination={{ clickable: true }}
      className="mySwiper bg-gray-200 overflow-hidden p-2 sm:p-1"
      breakpoints={{
        // When window width is >= 250px and < 400px
        250: {
          slidesPerView: 3,
        },
        // When window width is >= 640px
        640: {
          slidesPerView: 4,
        },
        // When window width is >= 768px
        768: {
          slidesPerView: 5,
        },
        // When window width is >= 1024px
        1024: {
          slidesPerView: 7,
        },
        // When window width is >= 1280px
        1280: {
          slidesPerView: 8,
        },
        // When window width is >= 1536px
        1536: {
          slidesPerView: 9,
        },
      }}
    >
      {buttons.map((button, index) => (
        <SwiperSlide key={index}>
          <button className="bg-gray-200 hover:bg-gray-500 hover:text-white hover:border-none text-gray-700  sm:py-1 px-3 sm:px-4 rounded-[50px] border border-gray-700 cursor-pointer sm:m-2 sm:w-[141px] text-base">
            {button.text}
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
