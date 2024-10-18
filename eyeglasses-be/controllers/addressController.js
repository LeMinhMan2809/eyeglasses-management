const addressModel = require("../models/address");
const getAddress = async (req, res) => {
  try {
    const address = await addressModel.find();
    res.json(address);
  } catch (error) {
    console.log(error);
    res.json({ sucess: false });
  }
};

const addAddress = async (req, res) => {
  const address = new addressModel({
    username: req.body.username,
    user: req.body.user,
    phoneNumber: req.body.phoneNumber,
    addressFull: req.body.addressFull,
    city: req.body.city,
    district: req.body.district,
    ward: req.body.ward,
  });
  try {
    await address.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getAddressByUserID = async (req, res) => {
  try {
    const address = await addressModel
      .find({
        user: req.params.userID,
      })
      .populate("city district ward");
    res.json(address);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await addressModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = { getAddress, addAddress, getAddressByUserID, deleteAddress };
