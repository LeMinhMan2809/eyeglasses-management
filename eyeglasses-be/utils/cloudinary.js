const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({ 
        cloud_name: process.env.cloudinary_config_cloud_name, 
        api_key: process.env.cloudinary_config_api_key, 
        api_secret: process.env.cloudinary_config_api_secret,
    })

module.exports = cloudinary