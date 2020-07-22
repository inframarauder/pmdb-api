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
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Session timed out,please login again" });
      } else if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ error: "Invalid token,please login again!" });
      } else {
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  }
};
