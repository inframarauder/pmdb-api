const { userValidator, reviewValidator } = require("../configs/Validators");

exports.validate = (req, res, next) => {
  let error = null;
  if (req.path.includes("auth")) {
    error = userValidator(req.body).error;
  } else if (req.path.includes("reviews")) {
    error = reviewValidator(req.body);
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
