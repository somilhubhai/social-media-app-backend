const { Router } = require("express");
const User = require("../model/user");
const router = Router();

// signup route
router.post("/signup", async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      username,
    });
    if (user) return res.json({ success: true, user: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(username, password);
    return res.json({ token: token });
  } catch (error) {
    return res.json({ error: error });
  }
});

// logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token").send("user logout");
});

// user info
router.get("/info/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user && user.username)
      return res.json({ message: "user found", user: user });
    else if (!user)
      return res.json({ message: "user not found", success: false });
  } catch (error) {
    return res.json({ error: error });
  }
});

module.exports = router;
