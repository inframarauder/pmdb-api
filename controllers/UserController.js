const User = require("../models/user.model");

exports.read_user = async (req, res) => {
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
