import React from "react";
import productImage from "../assets/HMK_glasses.png";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const Cart = () => {
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
      <div className="ml-[100px] mr-[100px] mt-8">
        <h1 className="text-2xl mb-4">Giỏ hàng</h1>

        <div className="flex gap-10">
          <table>
            <thead className="text-lg bg-gray-50 dark:bg-gray-300">
              <tr>
                <th className="px-5 py-3">Sản phẩm</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Số lượng</th>
                <th className="px-6 py-3">Tổng cộng</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-lg font-medium">
                <th className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img className="w-[100px]" src={productImage} />
                    <div>Gọng kính HMK</div>
                  </div>
                </th>
                <td className="px-6 py-4">420.000đ</td>
                <td className="px-6 py-4">
                  <div className="border-[#c3a26a] border-2 w-fit px-3 py-2 rounded-2xl">
                    <button>
                      <RemoveIcon onClick={onDecrease} />
                    </button>
                    <input
                      className="w-10 text-center text-black font-medium bg-transparent"
                      type="text"
                      value={value}
                    />
                    <button>
                      <AddIcon onClick={onIncrease} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-5 bg-[#f3f3f3]">
            <p className="text-2xl text-center pb-4">Tóm tắt đơn hàng</p>
            <div className="flex items-center justify-between text-lg">
              <p>Tổng</p>
              <p>$2999</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
