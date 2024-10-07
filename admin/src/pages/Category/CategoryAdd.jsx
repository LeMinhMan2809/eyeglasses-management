import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addCategoryAPI } from "../../utils/handleAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryAdd = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const onChange = (e) => {
    setData(() => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const addCategory = (event) => {
    event.preventDefault();
    addCategoryAPI("/api/category/add", data).then((res) => {
      if (res.success) {
        setData({
          name: "",
          description: "",
        });
        toast.success("Danh mục đã được thêm");
      } else {
        toast.error("Danh mục đã tồn tại");
      }
      // console.log(res);
    });
  };

  return (
    <div className="mt-[6.5rem] mx-[1rem] w-[50rem]">
      <form onSubmit={addCategory}>
        <div className="bg-white rounded-lg p-5">
          <h5 className="text-xl font-medium mb-3">Thêm mới danh mục</h5>

          <div className="mt-5">
            <p className="text-lg mb-2">Tên danh mục</p>
            <input
              value={data.name}
              onChange={onChange}
              name="name"
              required
              placeholder="Nhập tên danh mục"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>

          <div className="mt-5">
            <p className="text-lg mb-2">Mô tả danh mục</p>
            <textarea
              value={data.description}
              onChange={onChange}
              className="w-[500px] h-[4rem] rounded-lg px-2 py-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
              name="description"
              id=""
            ></textarea>
            {/* <input
              required
              placeholder="Nhập tên sản phẩm"
              className="w-[500px] h-[10rem] rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            /> */}
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#c3a26a] text-white px-5 py-2 rounded-lg mt-5 w-full"
            >
              Thêm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryAdd;
