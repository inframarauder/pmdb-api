const multer = require("../configs/multer");

module.exports = (req, res, next) => {
  const checkUpload = multer.any();
  checkUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      next();
    }
  });
};
