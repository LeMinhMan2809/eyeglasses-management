import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addProductAPI, listCategories } from "../../utils/handleAPI";
const ProductAdd = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [image, setImage] = useState(false);

  useEffect(() => {
    listCategories("/api/category").then((res) => {
      setCategoryData(res);
    });
  }, []);

  const handleChangeCategory = (e) => {
    setCategoryValue(e.target.value);
    console.log(e.target.value);
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantityStock: "",
    category: "",
    // images: [],
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const addImage = (e) => {
    // const arr = [];
    // arr.push(e.target.files[0].name);
    // console.log(arr);
    // setFormData(() => ({
    //   ...formData,
    //   [e.target.name]: arr,
    // }));
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    // if (e.target.files && e.target.files[0]) {
    //   const selectedImage = e.target.files[0];
    //   setImage(selectedImage); // This sets the selected image
    //   console.log("Selected file:", selectedImage);
    // }
  };
  const addProduct = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("quantityStock", formData.quantityStock);
    formDataToSend.append("category", categoryValue);

    if (image) {
      formDataToSend.append("images", image); // Append the file
    }
    addProductAPI("/api/product/add", formDataToSend).then((res) => {
      if (res.success) {
        setFormData({
          name: "",
          description: "",
          price: "",
          quantityStock: "",
          category: "",
        });
        setCategoryValue("");
        setImage(false);
        toast.success("Sản phẩm đã được thêm");
      } else {
        toast.error(res.message);
      }
      console.log(res);
    });
  };

  return (
    <div className="mt-[6.5rem] mx-[1rem] w-full">
      <form onSubmit={addProduct} encType="multipart/form-data">
        <div className="bg-white rounded-lg p-5">
          <h5 className="text-xl font-medium mb-3">Thêm mới sản phẩm</h5>

          <div className="mt-5">
            <p className="text-lg mb-2">Tên sản phẩm</p>
            <input
              value={formData.name}
              name="name"
              onChange={handleChange}
              required
              placeholder="Nhập tên sản phẩm"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>

          <div className="mt-5">
            <p className="text-lg mb-2">Mô tả sản phẩm</p>
            <textarea
              value={formData.description}
              name="description"
              onChange={handleChange}
              className="w-[500px] h-[4rem] rounded-lg px-2 py-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
              id=""
            ></textarea>
            {/* <input
              required
              placeholder="Nhập tên sản phẩm"
              className="w-[500px] h-[10rem] rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            /> */}
          </div>

          <div className="mt-5">
            <p className="text-lg mb-2">Giá sản phẩm</p>
            <input
              value={formData.price}
              name="price"
              onChange={handleChange}
              required
              placeholder="Nhập tên sản phẩm"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>

          <div className="mt-5">
            <p className="text-lg mb-2">Số lượng sản phẩm</p>
            <input
              value={formData.quantityStock}
              name="quantityStock"
              onChange={handleChange}
              required
              placeholder="Nhập tên sản phẩm"
              className="w-[500px] h-10 rounded-lg px-2 border-2 focus:outline-none focus:border-[#c3a26a] border-stone-500"
            />
          </div>

          <div className="mt-5">
            <p className="text-lg mb-2">Danh mục sản phẩm</p>
            <Select
              className="w-[10rem]"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={categoryValue}
              onChange={handleChangeCategory}
            >
              {/* <MenuItem value="">
                <em value={null}>None</em>
              </MenuItem> */}
              {categoryData?.map((item, index) => (
                <MenuItem key={index} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
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
              name="images"
              // onChange={(e) => setImage(e.target.files[0])}
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

export default ProductAdd;
