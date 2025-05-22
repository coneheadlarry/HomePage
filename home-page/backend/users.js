const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const db = new Database("mydb.sqlite");

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user')),
    password_changed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const admin = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!admin) {
  const password_hash = bcrypt.hashSync("admin123", 10); // Change password for production!
  db.prepare(
    `
    INSERT INTO users (username, password_hash, role)
    VALUES (?, ?, ?)
  `
  ).run("admin", password_hash, "admin");
  console.log(
    "Default admin account created: username=admin, password=admin123"
  );
}

module.exports = db;
