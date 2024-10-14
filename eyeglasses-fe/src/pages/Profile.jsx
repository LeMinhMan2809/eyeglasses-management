import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Modal, Button } from "antd";

const Profile = () => {
  const { url } = useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );
  useEffect(() => {
    axios.get("http://localhost:4000/api/user/").then((res) => {
      setUserProfile(res.data);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the avatar with the new image
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {userProfile.map((profile) => {
        return (
          <div key={profile._id}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  id="avatar"
                  src={selectedImage}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                />

                <label
                  htmlFor="file-input"
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer"
                >
                  <ModeEditOutlineIcon fontSize="medium" color="info" />
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold">Manle</h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-500 mb-2">Tên người dùng</p>
                  <input
                    className="border-2 p-2 font-medium"
                    type="text"
                    value={profile.name}
                  />
                </div>
                <div>
                  <p className="text-base text-gray-500">Email address</p>
                  <p className="font-medium">{userProfile[0].email}</p>
                </div>
                <div>
                  <p className="text-base text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{userProfile[0].phone}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div>
                  <Button
                    className="font-semibold"
                    type="primary"
                    onClick={showModal}
                  >
                    Open Modal
                  </Button>
                  <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <div className="max-w-lg mx-auto rounded-md">
                      <div className="mb-4">
                        <label for="name" className="block text-gray-700 mb-2">
                          Tên của bạn
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Tên của bạn"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                          <label
                            for="phone"
                            className="block text-gray-700 mb-2"
                          >
                            Số điện thoại
                          </label>
                          <input
                            id="phone"
                            type="text"
                            placeholder="Số điện thoại"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          for="address"
                          className="block text-gray-700 mb-2"
                        >
                          Số nhà và tên đường
                        </label>
                        <input
                          id="address"
                          type="text"
                          placeholder="Số nhà và tên đường"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label
                            for="city"
                            className="block text-gray-700 mb-2"
                          >
                            Tỉnh thành
                          </label>
                          <select
                            id="city"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Hà Nội</option>
                            <option>TP. Hồ Chí Minh</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label
                            for="district"
                            className="block text-gray-700 mb-2"
                          >
                            Chọn Quận/Huyện
                          </label>
                          <select
                            id="district"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Chọn Quận/Huyện</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label
                            for="ward"
                            className="block text-gray-700 mb-2"
                          >
                            Phường/Xã
                          </label>
                          <select
                            id="ward"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Chọn Phường/Xã</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">United Kingdom</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City/State</p>
                  <p className="font-medium">Leeds, East London</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
