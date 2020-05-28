const jwt = require("jsonwebtoken");

//middleware to protect routes

exports.isAuthenticated = (req, res, next) => {
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

//middleware to check admin permission
exports.isAdmin = (req, res, next) => {
  let { type } = req.user;
  if (type && type === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Invalid user type!" });
  }
};
