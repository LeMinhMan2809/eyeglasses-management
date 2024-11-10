import React, { useEffect, useState } from "react";
import thankyou from "../assets/Thanks.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const PayMent = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  useEffect(() => {
    if (vnp_Amount) {
      setPaymentStatus(
        `Thanh toán thành công đơn hàng ${vnp_TxnRef} với tổng số tiền ${vnp_Amount.toLocaleString(
          "vi-VN"
        )}`
      );
    }
  }, []);

  return (
    <div>
      {paymentStatus ? (
        <div className="mb-[18.9rem]">
          <div className="flex justify-center mt-5">
            <img className="w-10" src={thankyou} />
          </div>
          <div>
            <p className="text-2xl font-bold text-center text-green-600">
              Thanh toán thành công
            </p>
          </div>
          <h1 className="text-xl font-bold text-center mt-2 text-green-500">
            Cảm ơn bạn đã đặt hàng
          </h1>
          <div className="mt-6 text-center">
            <button className="px-4 py-2 text-white bg-[#AB886D] rounded hover:bg-[#aa6d3e]">
              <a href="/">Về trang chủ</a>
            </button>
          </div>
        </div>
      ) : (
        <>
          <Box
            className="flex justify-center items-center mt-10"
            sx={{ display: "flex" }}
          >
            <CircularProgress />
          </Box>
          <p className="text-center text-xl mt-5">Đang xử lý...</p>
        </>
      )}
    </div>
  );
};
export default PayMent;
