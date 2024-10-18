const cityModel = require("../models/city");

const getCity = async (req, res) => {
  try {
    const city = await cityModel.find();
    res.json(city);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports = { getCity };
