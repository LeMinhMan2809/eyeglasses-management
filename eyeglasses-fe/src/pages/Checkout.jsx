import React, { useState, useContext, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Checkout = () => {
  const { url } = useContext(StoreContext);
  const [cartDataList, setCartDataList] = useState([]);

  const ls = typeof window !== "undefined" ? localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartDataList(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  return (
    <div className="ml-[100px] mr-[100px] mt-8">
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-4">Thanh toán</h1>
          <p className="font-semibold text-lg mb-3">Địa chỉ nhận hàng</p>
          <div className="flex items-center">
            <input
              type="radio"
              name="address"
              className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-base font-medium ml-3">
              Nguyễn Văn A, (+84) 901 008 657, Số 100A, Phường Phú Thuận, Quận
              7, Hồ Chí Minh
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="address"
              className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-base font-medium ml-3">
              Nguyễn Văn A, (+84) 901 008 657, Số 100A, Phường Phú Thuận, Quận
              7, Hồ Chí Minh
            </span>
          </div>

          <div className="p-5 bg-[#f3f3f3] w-full mt-3 text-lg">
            <p className="text-center pb-[3rem] font-semibold">Đơn hàng</p>

            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[20rem] text-left">Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartDataList.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b text-center border-gray-400 mb-5"
                  >
                    <td className="flex items-center">
                      <img
                        className="w-[100px] mr-5"
                        src={`${url}/images/${item.product.images}`}
                        alt=""
                      />
                      <p>{item.product.name}</p>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price}</td>
                    <td>{item.product.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-5">
              Phí vận chuyển:
              <span className="text-lg font-medium">0</span>
            </div>
            <div className="flex justify-between mt-5">
              Tổng cộng:
              <span className="text-lg font-medium">
                {cartDataList.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <p>Lời nhắn: </p>
            <input
              type="text"
              placeholder="Lưu ý cho cửa hàng..."
              className="p-2 border-2"
            ></input>
          </div>

          <p className="font-semibold text-lg mt-5">Phương thức thanh toán</p>
          <div className="flex flex-col">
            <div>
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                className="mr-2"
              />
              <label htmlFor="cod">Thanh toán khi giao hàng</label>
            </div>

            <div>
              <input
                type="radio"
                id="bank"
                name="payment"
                value="bank"
                className="mr-2"
              />
              <label htmlFor="bank">Thanh toán qua VNPAY</label>
            </div>

            <div className="flex justify-center mt-5">
              <button className="text-center px-10 py-2 bg-orange-500 rounded-md">
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
