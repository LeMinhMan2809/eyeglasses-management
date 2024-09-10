import React from "react";
import banner2 from "../assets/banner2.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Banner = () => {
  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      <SwiperSlide>
        <div>
          <img src={banner2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div>
          <img src={banner2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};

export default Banner;
