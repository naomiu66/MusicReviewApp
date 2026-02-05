const disabledRoute = (reason) => (req, res) => {
  res.status(503).json({
    message: reason,
  });
};

module.exports = disabledRoute;
