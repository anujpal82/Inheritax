const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/user.modal");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid email or password", isError: true });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid email or password", isError: true });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      msg: "Login successful",
      token,
      user: userWithoutPassword,
      isError: false,
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: `Something went wrong at server : ${err.message}` });
  }
};

module.exports = { loginUser };
