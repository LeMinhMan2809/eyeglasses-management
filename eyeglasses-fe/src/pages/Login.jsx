import React from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import loginPic from "../assets/login_banner.png";

const Login = () => {
  return (
    <div className="mt-6 ml-[9rem] mr-[9rem] flex gap-2">
      <div>
        <img className="rounded-lg w-[560px] h-[420px]" src={loginPic} alt="" />
      </div>
      <div className="w-[660px] bg-stone-400">
        <div>
          <p className="text-xl text-center font-bold mt-3">Đăng nhập</p>
          <p className="text-lg text-center font-medium">
            Hãy đăng nhập để mua sắm dễ dàng hơn
          </p>
        </div>
        <form>
          <div className="ml-10 mt-5">
            <p className="text-lg">TÀI KHOẢN</p>
            <input
              required
              placeholder="Nhập tài khoản"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>
          <div className="mt-3 ml-10">
            <p className="text-lg">MẬT KHẨU</p>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-[500px] h-10 rounded-lg text-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
            <div>
              <RemoveRedEyeIcon className="absolute right-[280px] top-[333px] cursor-pointer" />
            </div>
          </div>

          <div>
            <p className="text-lg font-bold mt-3 ml-10">Quên mật khẩu?</p>
          </div>

          <div className="flex mt-5 justify-center">
            <button className="bg-[#c3a26a] text-white font-medium rounded-lg px-10 py-2">
              Đăng nhập
            </button>
          </div>

          <div className="mt-3 ml-8 flex self-center justify-center items-center">
            <div>
              <hr className="w-[50px]" />
            </div>

            <div>
              <p className="text-lg mx-4">Hoặc đăng nhập với</p>
            </div>

            <div>
              <hr className="w-[50px]" />
            </div>
          </div>

          <div>
            <p className="text-lg text-center font-bold mt-2 ml-10">
              Bạn chưa có tài khoản?{" "}
              <span className="underline text-[#238b7f]">
                <Link>Đăng ký ngay</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
