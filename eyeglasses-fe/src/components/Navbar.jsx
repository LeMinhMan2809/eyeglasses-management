import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import "../index.css";
import "./SearchBar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import LogoutIcon from "@mui/icons-material/Logout";
import logo_w from "../assets/logo_w.png";
import logo_b from "../assets/logo_b.png";
import search_icon_light from "../assets/search-w.png";
import search_icon_black from "../assets/search-b.png";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";

const Navbar = () => {
  const { cartData } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { setToken, setIsFocused } = useContext(StoreContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  const [showMenuUser, setShowMenuUser] = useState(false);

  const toggleMenuUser = () => {
    setShowMenuUser(!showMenuUser);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="bg-[#E1D7C6] w-full flex justify-between items-center pl-[80px] pr-[60px] py-5">
      <img src={logo_b} alt="logo" className="w-17 h-11 cursor-pointer" />
      <ul className="flex text-[17px] font-medium">
        <li className="mx-5 relative after:bg-[#c3a26a] after:absolute after:h-[0.1rem] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300">
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
      <div className="flex items-center justify-center rounded-[50px] px-[10px] py-[10px]">
        <div className="z-[1000]">
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="p-3 text-[15px] font-medium w-[270px] rounded-[50px] opacity-70"
          />
        </div>

        {/* <img
          src={search_icon_black}
          alt="search"
          className="w-4 h-4 absolute right-[250px] cursor-pointer"
        /> */}

        {/* <img src={toggle_light} alt="" className="w-10 cursor-pointer pl-4" /> */}

        {!token ? (
          <div className="">
            <Link to="/login">
              <div className="ml-2">
                <p className="bg-[#d3b581] py-2 px-3 rounded-xl font-medium">
                  Đăng nhập
                </p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="h-5">
            <button onClick={toggleMenuUser}>
              <Link to="">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 pl-2 cursor-pointer hover:text-[#c3a26a] transition-all ease-in-out duration-300"
                />
              </Link>
            </button>
            <div>
              <div
                className={`${
                  showMenuUser ? "subMenuUser" : "closeSubMenuUser"
                }`}
              >
                <Link to="/">Hồ sơ</Link>
                <button onClick={Logout} className="">
                  <LogoutIcon fontSize="small" className="pr-2" />
                  <Link to="/">Đăng xuất</Link>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="h-5">
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faBagShopping}
              className="w-5 h-5 pl-2 cursor-pointer"
            />
            <sup className="text-xs inline-block px-1 text-white rounded-full bg-red-500 text-center">
              {cartData.reduce((total, item) => total + item.quantity, 0)}
            </sup>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
