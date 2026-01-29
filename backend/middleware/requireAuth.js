const usersService = require("../services/usersService");

const requireAuth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await usersService.getUserById(req.session.userId);

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Failed to check authentication", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = requireAuth;
