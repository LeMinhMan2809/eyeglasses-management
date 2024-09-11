import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import logo_w from "../assets/logo_w.png";
import logo_b from "../assets/logo_b.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_black from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";

const Navbar = () => {
  return (
    <div className="bg-[#E1D7C6] w-full flex justify-between items-center pl-[80px] pr-[60px] py-5">
      <img src={logo_b} alt="logo" className="w-17 h-11 cursor-pointer" />
      <ul className="flex text-[17px] font-medium">
        <li className="px-5">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="productTitle px-5">
          <Link className="" to="/">
            Sản phẩm
          </Link>
          <div className="subMenu flex flex-col shadow">
            <Link to="/">Gọng kính</Link>
            <Link to="/">Tròng kính</Link>
            <Link to="/">Kính râm</Link>
          </div>
        </li>
        <li className="px-5">Cửa hàng</li>
        <li className="mx-5 relative after:bg-[#c3a26a] after:absolute after:h-[0.1rem] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
          <Link to="/">Bài viết</Link>
        </li>
      </ul>
      <div className="flex items-center rounded-[50px] px-[10px] py-[10px]">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="p-3 text-[15px] font-medium w-[270px] rounded-[50px] opacity-70"
        />
        <img
          src={search_icon_black}
          alt="search"
          className="w-4 h-4 absolute right-[200px] cursor-pointer"
        />
        <img src={toggle_light} alt="" className="w-10 cursor-pointer pl-4" />

        <div className="h-5">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="w-5 h-5 pl-2 cursor-pointer"
          />
          <sup className="text-xs inline-block px-1 text-white rounded-full bg-red-500 text-center">
            0
          </sup>
        </div>

        <div className="h-5">
          <Link to="/login">
            <FontAwesomeIcon
              icon={faUser}
              className="w-5 h-5 pl-2 cursor-pointer hover:text-[#c3a26a] transition-all ease-in-out duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
