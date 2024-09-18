import React from "react";
import Banner from "./Banner";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import ProductCard from "../components/ProductCard";

import warrantyIcon from "../assets/warranty.png";

const Home = () => {
  return (
    <>
      <Banner />

      <div className="mt-5 ml-[80px] mr-[80px]">
        <h3 className="text-3xl pb-5">Bán chạy nhất</h3>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>

      <hr className="mt-[5rem]"></hr>

      <div className="mx-[80px] my-10 grid grid-cols-4 justify-items-center">
        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Bảo hành trọn đời</p>
        </div>

        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Thu cũ đổi mới</p>
        </div>

        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Đo mắt miễn phí</p>
        </div>

        <div className="flex self-center items-center gap-3">
          <img className="w-[50px]" src={warrantyIcon} />
          <p className="font-medium">Đổi trả</p>
        </div>
      </div>

      <hr className=""></hr>
    </>
  );
};

export default Home;
