const { User, validateUser } = require("../models/user.model");
const Token = require("../models/token.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    let { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      let newUser = await new User(req.body).save();
      let accessToken = await newUser.generateAccessToken();
      let refreshToken = await newUser.generateRefreshToken();

      return res.status(200).json({ accessToken, refreshToken });
    }
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: `A user with the username ${req.body.username} already exists!`,
      });
    } else {
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "No user found!" });
    } else {
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        let accessToken = await user.generateAccessToken();
        let refreshToken = await user.generateRefreshToken();

        return res.status(200).json({ accessToken, refreshToken });
      } else {
        return res.status(401).json({ error: "Invalid username or password!" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(403).json({ error: "Access denied,token missing!" });
    } else {
      const token = await Token.findOne({ refreshToken });
      if (!token) {
        return res.status(401).json({ error: "Token expired!" });
      } else {
        const payload = jwt.verify(
          token.refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const accessToken = jwt.sign(
          { _id: payload._id, type: payload.type },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME }
        );
        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ refreshToken });
    return res.status(200).json({ success: "User logged out!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
