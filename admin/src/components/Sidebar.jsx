import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const isOpenSubMenu = (index) => {
    setOpenSubMenu(!openSubMenu);
    setActiveTab(index);
  };

  return (
    <div className="ml-[1.5rem] fixed top-[6rem] h-full">
      <div>
        <ul>
          <li className="mb-3">
            <Link to="/dashboard">
              <button className="flex items-center justify-center w-[100%]">
                <DashboardIcon />
                <p className="ml-2 font-medium text-lg">Dashboard</p>
                <span className="ml-[7rem]">
                  <ArrowForwardIosIcon />
                </span>
              </button>
            </Link>
          </li>

          <li className="mb-3">
            <button
              className={`flex items-center justify-center w-[100%] ${
                activeTab === 1 ? "active" : ""
              }`}
              onClick={() => isOpenSubMenu(1)}
            >
              <div>
                <FaBoxOpen />
              </div>
              <p className="ml-2 font-medium text-lg">Product</p>
              <span className="ml-auto">
                <ArrowForwardIosIcon />
              </span>
            </button>
            <ul
              className={`ml-6 transition-all ease-in-out overflow-hidden ${
                openSubMenu === true && activeTab === 1 ? "openSub" : "closeSub"
              }`}
            >
              <li className="py-2">
                <Link to="/product">Products List</Link>
              </li>
              <li>
                <Link to="/product/add">Products Upload</Link>
              </li>
            </ul>
          </li>

          <li className="mb-3">
            <button
              className={`flex items-center justify-center w-[100%] ${
                activeTab === 2 ? "active" : ""
              }`}
              onClick={() => isOpenSubMenu(2)}
            >
              <div>
                <BiCategoryAlt />
              </div>
              <p className="ml-2 font-medium text-lg">Category</p>
              <span className="ml-auto">
                <ArrowForwardIosIcon />
              </span>
            </button>
            <ul
              className={`ml-6 transition-all ease-in-out overflow-hidden ${
                openSubMenu === true && activeTab === 2 ? "openSub" : "closeSub"
              }`}
            >
              <li className="py-2">
                <Link to="/category">Categories List</Link>
              </li>
              <li>
                <Link to="/category/add">Category Upload</Link>
              </li>
            </ul>
          </li>

          <li className="mb-3">
            <button className="flex items-center justify-center w-[100%]">
              <div>
                <ShoppingCartIcon />
              </div>
              <p className="ml-2 font-medium text-lg">Orders</p>
              <span className="ml-auto">
                <ArrowForwardIosIcon />
              </span>
            </button>
          </li>
          <li className="mb-3">
            <button className="flex items-center justify-center w-[100%]">
              <div>
                <AccountCircleIcon />
              </div>
              <p className="ml-2 font-medium text-lg">Users</p>
              <span className="ml-auto">
                <ArrowForwardIosIcon />
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
