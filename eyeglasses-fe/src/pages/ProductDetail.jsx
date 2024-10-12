import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import productImage from "../assets/HMK_glasses.png";
import { getProductIDAPI, listProducts } from "../utils/handleAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { url, token, setToken, isFocused } = useContext(StoreContext);
  const context = useContext(StoreContext);
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setInputValue] = React.useState(1);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    getProductIDAPI("/api/product/", id).then((res) => {
      setProductData(res);
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  // const addToCart = (productData, quantity) => {
  //   // if (!isLoggedIn) {
  //   //   toast.error("Bạn phải đăng nhập để thêm vào giỏ hàng!");
  //   // }
  //   context.addToCart(productData, quantity);
  // };

  const addToCartHandler = () => {
    if (!isLoggedIn) {
      toast.error("Bạn phải đăng nhập để thêm vào giỏ hàng!");
    } else {
      context.addToCart(productData, value);
    }
  };

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
            src={"http://localhost:4000/images/" + productData.images}
            className="w-[600px] h-[600px] rounded-xl"
          />
          {/* <img className="w-[600px] rounded-xl" src={productImage} alt="" /> */}
          <FavoriteBorderIcon className="absolute left-[680px] top-[200px] cursor-pointer" />
        </div>

        <div>
          <p className="text-3xl font-bold">{productData.name}</p>

          <div className="mt-5">
            <span className="text-xl font-medium pt-5 text-red-500">
              {productData.price} VNĐ
            </span>
            <span className="text-base font-medium pt-5 pl-3 line-through">
              200.000 VNĐ
            </span>
          </div>

          <p className="mt-5">{productData.description}</p>

          <div className="flex self-center gap-8">
            <div className="mt-5 bg-[#c3a26a] w-[8rem] px-5 py-3 rounded-xl">
              <button>
                <RemoveIcon onClick={onDecrease} />
              </button>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                className="w-10 text-center text-white font-medium bg-[#c3a26a]"
                type="text"
                value={value}
              />
              <button>
                <AddIcon onClick={onIncrease} />
              </button>
            </div>

            <div>
              <button
                onClick={() => addToCartHandler()}
                className="bg-[#c3a26a] text-white font-medium rounded-xl px-10 py-3 mt-5"
              >
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
