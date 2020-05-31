const User = require("../models/user.model");

exports.read = async (req, res) => {
  try {
    let user = await User.findById(req.params.id, { password: 0, type: 0 });
    if (!user) {
      res.status(404).json({ error: "User not found!" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.update = async (req, res) => {
  try {
    let { username, email } = req.body;
    let user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username,
        email: email,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
