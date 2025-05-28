const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./Users");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role)
    return res.status(400).json({ message: "Username and password required" });

  // Check if username is taken
  const exists = db
    .prepare(`SELECT 1 FROM users WHERE username = ?`)
    .get(username);
  if (exists)
    return res.status(400).json({ message: "Username already exists" });

  // Hash password
  const password_hash = await bcrypt.hash(password, 10);

  // Insert user with provided role
  const stmt = db.prepare(`
    INSERT INTO users (username, password_hash, role)
    VALUES (?, ?, ?)
  `);
  stmt.run(username, password_hash, role);

  res.status(201).json({ message: "Registered", role });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  const user = db
    .prepare(`SELECT * FROM users WHERE username = ?`)
    .get(username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  req.session.userId = user.id;

  res.json({ message: "Logged in" });
});

// Session check
router.get("/session", (req, res) => {
  if (req.session && req.session.userId) {
    const user = db
      .prepare("SELECT role FROM users WHERE id = ?")
      .get(req.session.userId);
    res.json({ authenticated: true, role: user?.role });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
