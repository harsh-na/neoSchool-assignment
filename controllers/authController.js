const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/jwt");

// Dummy credentials
const dummyUser = {
  username: "saltman",
  password: bcrypt.hashSync("oai1122", 8),
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === dummyUser.username &&
    bcrypt.compareSync(password, dummyUser.password)
  ) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};
