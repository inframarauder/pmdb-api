const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype.match(/jpg|jpeg|png$/i)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg,jpeg,png files allowed!", null));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10, //10MB limit
  },
});
