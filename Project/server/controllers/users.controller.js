const User = require("../modals/user.modal");
const bcrypt = require("bcryptjs");

const registeruser = async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists", isError: true });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ msg: "User registered successfully", isError: false });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: `Something went wrong at server : ${err.message}` });
  }
};

const profileInformation = async (req, res) => {
  try {
    res.status(200).json({ user: req.user, isError: false });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Something went wrong: ${err.message}`, isError: true });
  }
};

module.exports = { registeruser, profileInformation };
