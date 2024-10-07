import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addProduct } from "../utils/api";

const CategoryAdd = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    image: [],
  });

  const onChange = (e) => {
    setData(() => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const addImage = (e) => {
    const arr = [];
    arr.push(e.target.value);
    setData(() => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const addCategory = (event) => {
    event.preventDefault();
    addProduct("/api/category");
    console.log(data);
  };

  return (
    <div className="mt-[6.5rem] mx-[1rem] w-[50rem]">
      <form onSubmit={addCategory}>
        <div className="bg-white rounded-lg p-5">
          <h5 className="text-xl font-medium mb-3">Thêm mới danh mục</h5>

          <div className="mt-5">
            <p className="text-lg mb-2">Tên danh mục</p>
            <input
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

          <div className="mt-5">
            <p className="text-lg mb-2">Hình ảnh</p>
            <label htmlFor="image">
              <img
                className="pb-3 w-[15rem]"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
            <input
              type="file"
              name="image"
              //onChange={(e) => setImage(e.target.files[0])}
              onChange={addImage}
            />
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
