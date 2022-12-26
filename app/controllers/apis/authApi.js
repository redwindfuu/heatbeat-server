const loginApi = async (req, res) => {
  try {
    res.json({ message: "Hello World!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginApi,
};
