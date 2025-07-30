const validateUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    res.status(400).json({ error: "Username and password are required" });

  if (username.length < 3 || password.length < 3)
    res.status(400).json({
      error: "Username and password must be at least 3 characters long",
    });

  next();
};

module.exports = validateUser;