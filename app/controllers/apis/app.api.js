const { successCallBack } = require('../../configs/response/ResponseSuccess');
const { error_db_querry, error_missing_params } = require('../../configs/response/ResponseError');
const Users = require("../../models/user.model");

const logIn = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (!username) return res.status(400).json(error_missing_params('username'));
    if (!password) return res.status(400).json(error_missing_params('password'));

    let user = await Users.findOne({ username, password });

    if (!user) {
        return res.status(400).json({
            status: false,
            message: 'Invalid username or password',
        });
    } 

    return res.status(200).json({
        ...successCallBack,
        data: user,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    let {
      username,
      password,
      fullname,
      birthday,
      isPlaySport,
      gender,
      whereLive,
    } = req.body;

    if (!username) return res.status(400).json(error_missing_params('username'));
    if (!password) return res.status(400).json(error_missing_params('password'));
    if (!fullname) return res.status(400).json(error_missing_params('fullname'));
    if (!birthday) return res.status(400).json(error_missing_params('birthday'));
    if (isPlaySport === null || isPlaySport === undefined) return res.status(400).json(error_missing_params('isPlaySport'));
    if (gender === null || gender === undefined) return res.status(400).json(error_missing_params('gender'));
    if (!whereLive) return res.status(400).json(error_missing_params('whereLive'));

    let user = await Users.findOne({ username });

    if (user) {
        return res.status(400).json({
            status: false,
            message: 'User already registered',
        });
    } 

    const newUser = await Users.create({
      username,
      password,
      name: fullname,
      birth: birthday,
      isPlaySport,
      gender,
      whereLive,
    });

    return res.status(200).json({
        ...successCallBack,
        data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    logIn,
    registerUser,
};
