require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session); // <-- add this
const bcrypt = require("bcrypt");
const db = require("./Users");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_HOST || "http://localhost:3000",
    credentials: true,
  })
);

const PORT = process.env.PORT;
console.log(PORT);
// confirm.log(process.env.secret);
// Middleware
app.use(express.json());
app.use(
  session({
    store: new SQLiteStore({
      db: "sessions.sqlite",
      dir: "./",
    }),
    secret: "mago",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
      sameSite: "lax",
      secure: false,
    },
  })
);

// Register
app.post("/register", async (req, res) => {
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
  const result = stmt.run(username, password_hash, role);

  res.status(201).json({ message: "Registered", role });
});

app.post("/login", async (req, res) => {
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

// Check if server is running
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

const links = require("./links.json");

app.get("/api/links", (req, res) => {
  res.json(links);
});

// check for session
app.get("/api/session", (req, res) => {
  if (req.session && req.session.userId) {
    const user = db
      .prepare("SELECT role FROM users WHERE id = ?")
      .get(req.session.userId);
    res.json({ authenticated: true, role: user?.role });
  } else {
    res.status(401).json({ authenticated: false });
  }
});
