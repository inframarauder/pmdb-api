const { User, validateUser } = require("../models/user.model");

exports.signup = async (req, res) => {
  try {
    let { error } = validateUser(req.body);
    if (err)
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      } else {
        let newUser = await new User(req.body).save();
        return res.status(200).json(newUser);
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
    let { error } = validateUser(req.body);
    if (err)
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      } else {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
          return res.status(404).json({ error: "No user found!" });
        } else {
          let valid = await bcrypt.compare(req.body.password, user.password);
          if (valid) {
            let token = user.generateAuthToken();
            return res.status(200).json({ token });
          } else {
            return res
              .status(401)
              .json({ error: "Invalid username or password!" });
          }
        }
      }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
