import React from "react";
import SideBarCat from "../components/SideBarCat";
import ProductCard from "../components/ProductCard";

const ListingProduct = () => {
  return (
    <section className="bg-[#fbfbfb]">
      <div className="flex justify-start ml-[100px] mr-[100px] mt-10">
        <div>
          <SideBarCat />
        </div>

        <div className="w-full] ml-10">
          <h1 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h1>
          <div className="grid grid-cols-4 gap-5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingProduct;
