const usersService = require("../services/usersService");
const authService = require("../services/authService");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Required fields are not provided" });

  try {
    const existingUser = await usersService.getUserByEmail(email);
    if (existingUser)
      return res
        .status(409)
        .json({ message: "User with provided email already exists" });

    const hashedPassword = await authService.hashPassword(password);

    const user = await usersService.createUser(name, email, hashedPassword);

    req.session.userId = user._id;

    res.status(201).json({ message: "Successfully registered and logged in" });
  } catch (err) {
    console.error("Failed to register user", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Required fields are not provided" });

  try {
    const existingUser = await usersService.getUserByEmail(email);
    if (!existingUser)
      return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await authService.comparePasswords(
      password,
      existingUser.password,
    );

    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    req.session.userId = existingUser._id;

    return res.status(200).json({
      message: "Successfully logged in",
    });
  } catch (err) {
    console.error("Failed to login user", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.json({ message: "Logged out" });
  });
};

const getProfile = async (req, res) => {
  return res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  });
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
