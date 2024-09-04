import React from "react";
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
    <div className="bg-[#d9e6e6] w-full flex justify-between items-center pl-[80px] pr-[60px] py-5">
      <img src={logo_b} alt="logo" className="w-17 h-11 cursor-pointer" />
      <ul className="flex text-[17px] font-medium">
        <li className="px-5">Trang chủ</li>
        <li className="px-5">Sản phẩm</li>
        <li className="px-5">Cửa hàng</li>
      </ul>
      <div className="flex items-center rounded-[50px] px-[10px] py-[10px]">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="p-3 text-[15px] w-[250px] rounded-[50px]"
        />
        <img
          src={search_icon_black}
          alt="search"
          className="w-4 h-4 absolute right-[180px] cursor-pointer"
        />
        <img src={toggle_light} alt="" className="w-10 cursor-pointer pl-4" />
        <FontAwesomeIcon
          icon={faBagShopping}
          className="w-5 h-5 pl-2 cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faUser}
          className="w-5 h-5 pl-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
