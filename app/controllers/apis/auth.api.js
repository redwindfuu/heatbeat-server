const Users = require("../../models/user.model");

const loginApi = async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await Users.findOne({ username: username, password: password });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
    req.session.userId = user.id;
    res.redirect("/page/heartbeat");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerApi = async (req, res) => {
  try {
    let {
      username,
      password,
      confirmPassword,
      fullname,
      birthday,
      isPlaySports,
      gender,
      whereLive,
    } = req.body;

    const newUser = await Users.create({
      username,
      password,
      name: fullname,
      birth: birthday,
      isPlaySport: isPlaySports === "on" ? true : false,
      gender: gender === "male" ? true : false,
      whereLive,
    });

    // res.json({ user: newUser });
    res.redirect("/page/auth/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutApi = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginApi,
  registerApi,
  logoutApi,
};
