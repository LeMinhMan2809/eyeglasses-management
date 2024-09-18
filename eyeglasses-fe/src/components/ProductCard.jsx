import React from "react";

const ProductCard = () => {
  return (
    <>
      <div className="border-2 border-black rounded-xl w-[280px] flex flex-col">
        <div className="w-[270px] h-[300px] flex justify-center items-center self-center rounded-xl">
          <img
            className="rounded-xl"
            src="https://kinhmatanna.com/_next/image?url=https%3A%2F%2Fcms.kinhmatanna.com%2Fwp-content%2Fuploads%2F2024%2F03%2FDMT05627-scaled.jpg&w=1080&q=75"
          ></img>
        </div>

        <div className="p-5">
          <p className="text-xl font-semibold">Gọng kính nhựa</p>
          <div>
            <span className="text-lg font-medium pt-5 text-red-500">
              150.000 VNĐ
            </span>
            <span className="text-base font-medium pt-5 pl-3 line-through">
              200.000 VNĐ
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
