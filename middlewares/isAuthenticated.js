//middleware to protect routes
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(403).json({ error: "Access denied, no token provided!" });
  } else {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};
