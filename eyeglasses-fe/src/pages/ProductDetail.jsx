import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import productImage from "../assets/HMK_glasses.png";

const ProductDetail = () => {
  const [value, setInputValue] = React.useState(1);

  const onIncrease = () => {
    setInputValue(value + 1);
  };
  const onDecrease = () => {
    if (value > 1) {
      setInputValue(value - 1);
    }
  };

  return (
    <div>
      <div className="ml-[150px] mr-[150px] mt-[4rem] flex gap-10">
        <div>
          <InnerImageZoom
            zoomType="hover"
            zoomScale={1}
            src={productImage}
            className="w-[600px] h-[600px] rounded-xl"
          />
          {/* <img className="w-[600px] rounded-xl" src={productImage} alt="" /> */}
          <FavoriteBorderIcon className="absolute left-[680px] top-[200px] cursor-pointer" />
        </div>

        <div>
          <p className="text-3xl font-bold">Gọng kính HMK</p>

          <div className="mt-5">
            <span className="text-xl font-medium pt-5 text-red-500">
              150.000 VNĐ
            </span>
            <span className="text-base font-medium pt-5 pl-3 line-through">
              200.000 VNĐ
            </span>
          </div>

          <p className="mt-5">
            Gọng kính cốt CTY là sản phẩm chất lượng cao, giúp bạn tạo nên phong
            cách thời trang độc đáo và thu hút mọi ánh nhìn.
          </p>

          <div className="flex self-center gap-10">
            <div className="mt-5 bg-[#c3a26a] w-[8rem] px-5 py-3 rounded-xl">
              <button>
                <RemoveIcon onClick={onDecrease} />
              </button>
              <input
                className="w-10 text-center text-white font-medium bg-[#c3a26a]"
                type="text"
                value={value}
              />
              <button>
                <AddIcon onClick={onIncrease} />
              </button>
            </div>

            <div>
              <button className="bg-[#c3a26a] text-white font-medium rounded-xl px-10 py-3 mt-5">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
