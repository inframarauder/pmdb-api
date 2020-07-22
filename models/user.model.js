const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("./token.model");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

//JWT Access and Refresh token generation methods:
userSchema.methods = {
  generateAccessToken: async function () {
    try {
      let accessToken = jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRY_TIME,
        }
      );
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },

  generateRefreshToken: async function () {
    try {
      let refreshToken = jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET
      );

      await new Token({ refreshToken }).save();
      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
};

//hashing password here
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return next();
});

module.exports = mongoose.model("User", userSchema);
