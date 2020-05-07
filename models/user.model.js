const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//JWT generation method
userSchema.methods.generateAuthToken = function () {
  const { JWT_PRIVATE_KEY } = process.env;
  let token = jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
  return token;
};

//hashing password here
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return next();
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().required().min(1),
    password: Joi.string().required().min(6),
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validateUser,
};
