const cloudinary = require("cloudinary").v2;


// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    upload_presets: process.env.UPLOAD_PRESETS,
});

module.exports = {cloudinary}
