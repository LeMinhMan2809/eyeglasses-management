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
} from "../../utils/handleAPI";
import { Link } from "react-router-dom";

const Categories = () => {
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [editCategoryID, setEditCategoryID] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    listCategories("/api/category").then((res) => {
      setData(res);
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

  const showDialogCategory = (id) => {
    setOpen(true);
    setEditCategoryID(id);
    listCategories("/api/category/" + id).then((res) => {
      setFormData({
        name: res.name,
        description: res.description,
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

  const deleteCate = (id) => {
    alert("Are you sure");
    deleteCategory("/api/category/", id).then((res) => {
      if (res.success) {
        listCategories("/api/category").then((res) => {
          setData(res);
        });
        toast.success("Danh mục xoá thành công");
      } else {
        toast.error("Error");
      }
    });
  };

  return (
    <div className="mt-[6.5rem] mx-[1rem] w-[50rem]">
      <div className="flex items-center self-center gap-10">
        <h5 className="text-xl font-medium">Danh sách danh mục</h5>
        <Link to="/category/add">
          <button className="bg-[#0d6efd] text-white px-3 py-1 rounded-md">
            Thêm danh mục
          </button>{" "}
        </Link>
      </div>

      <table className="w-full text-left mt-5">
        <thead>
          <tr className="border-b-2 border-gray-400">
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-base font-medium leading-none">Tên danh mục</p>
            </th>
            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-base font-medium leading-none">
                Mô tả danh mục
              </p>
            </th>

            <th className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-base font-medium leading-none">Hành động</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr
                key={index}
                className="hover:bg-slate-50 border-b border-gray-400"
              >
                <td className="p-4 py-5">
                  <p className="block font-semibold text-sm text-slate-800">
                    {item.name}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm font-medium">{item.description}</p>
                </td>
                <td className="p-4 py-5 flex items-center gap-3">
                  <button
                    aria-hidden="false"
                    onClick={() => showDialogCategory(item._id)}
                    className="px-2 py-1 rounded-lg bg-[#44da62]"
                  >
                    <EditIcon aria-hidden="false" fontSize="small" />
                  </button>
                  <button
                    onClick={() => deleteCate(item._id)}
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
        <DialogTitle>Cập nhật thông tin danh mục</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên danh mục"
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
            label="Mô tả danh mục"
            type="text"
            fullWidth
            variant="standard"
            value={formData.description}
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

export default Categories;
