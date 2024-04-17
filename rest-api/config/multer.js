const multer = require("multer");

//Option 1 - upload in Cloudinary
const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

//Option 2 - upload in my server in the uploads folder
// const upload = multer({ dest: "uploads/" });

module.exports = upload;
