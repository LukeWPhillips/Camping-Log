const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddb09rtfy",
  api_key: "717579431899845",
  api_secret: "IYiw5oqUFrxFjit9kOHXRFBtY9A",
});

module.exports = cloudinary;
