import React, { useEffect } from "react";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  listCategories,
  editCategory,
  deleteCategory,
  listProducts,
  deleteProducts,
} from "../../utils/handleAPI";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const url = "http://localhost:4000";
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);

  const [productData, setProductData] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [editProductID, setEditProductID] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantityStock: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    listProducts("/api/product").then((res) => {
      // console.log(res);
      setProductData(res);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const showDialogProduct = (id) => {
    setOpen(true);
    setEditProductID(id);
    listProducts("/api/product/" + id).then((res) => {
      setFormData({
        name: res.name,
        description: res.description,
        price: res.price,
        quantityStock: res.quantityStock,
        category: res.category,
        images: res.images,
      });
    });
  };

  const updateCategory = (e) => {
    e.preventDefault();
    //alert("Are you sure");
    editCategory("/api/category/" + editCategoryID, formData).then((res) => {
      if (res.success) {
        setOpen(false);
        toast.success("Danh mục đã được cập nhật");
        listCategories("/api/category").then((res) => {
          setData(res);
        });
      }
    });
  };

  const deleteProduct = (id) => {
    if (!confirm("Are you sure")) {
      return;
    }
    deleteProducts("/api/product/", id).then((res) => {
      if (res.success) {
        toast.success("Danh mục xoá thành công");
        listProducts("/api/product").then((res) => {
          setProductData(res);
        });
      } else {
        toast.error("Error");
      }
    });
  };

  return (
    <div className="mt-[6.5rem] mx-[1rem] w-[75rem]">
      <h5 className="text-xl font-medium mb-5">Danh sách sản phẩm</h5>
      {productData.length === 0 ? (
        <div className="flex flex-col gap-3 items-center justify-center">
          <p className="text-center font-medium">Chưa có sản phẩm</p>
          <Link to="/product/add">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Thêm sản phẩm
            </button>
          </Link>
        </div>
      ) : (
        <table className="w-full text-left ">
          <thead>
            <tr className="border-b-2 border-gray-400">
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">
                  Hình ảnh sản phẩm
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">
                  Tên sản phẩm
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">
                  Mô tả sản phẩm
                </p>
              </th>

              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">
                  Giá sản phẩm
                </p>
              </th>

              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">Số lượng </p>
              </th>

              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">Danh mục</p>
              </th>

              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-base font-medium leading-none">Hành động</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="hover:bg-slate-50 border-b border-gray-400"
                >
                  <td className="p-4 py-5">
                    {/* <img src={item.images[0]} alt="Image" /> */}
                    {item.images && item.images.length > 0 ? ( // Check if images exist
                      <img
                        src={`${url}/images/` + item.images} // Use the first image URL
                        alt="Product Image"
                        className="w-32 h-32 object-cover"
                      />
                    ) : (
                      <p>No Image Available</p> //
                    )}
                  </td>

                  <td className="p-4 py-5">
                    <p className="block font-semibold text-sm text-slate-800">
                      {item.name}
                    </p>
                  </td>

                  <td className="p-4 py-5">
                    <p className="text-sm font-medium">{item.description}</p>
                  </td>

                  <td className="p-4 py-5">
                    <p className="text-sm font-medium">{item.price}</p>
                  </td>

                  <td className="p-4 py-5">
                    <p className="text-sm font-medium">{item.quantityStock}</p>
                  </td>

                  <td className="p-4 py-5">
                    <p className="text-sm font-medium">{item.category.name}</p>
                  </td>

                  <td className="p-4 py-5 flex items-center gap-3">
                    <button
                      aria-hidden="false"
                      onClick={() => showDialogProduct(item._id)}
                      className="px-2 py-1 rounded-lg bg-[#44da62]"
                    >
                      <EditIcon aria-hidden="false" fontSize="small" />
                    </button>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="px-2 py-1 rounded-lg bg-red-500 text-white"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Dialog
        aria-hidden="false"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Cập nhật thông tin sản phẩm</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={onChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Mô tả sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={onChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Giá sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            value={formData.price}
            onChange={onChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="quantityStock"
            name="quantityStock"
            label="Mô tả sản phẩm"
            type="text"
            fullWidth
            variant="standard"
            value={formData.quantityStock}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button type="button" onClick={updateCategory}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsList;
