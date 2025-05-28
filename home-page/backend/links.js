const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const linksPath = path.join(__dirname, "links.json");
let links = JSON.parse(fs.readFileSync(linksPath, "utf-8"));

// Get all links
router.get("/get_links", (req, res) => {
  res.json(links);
});

// Add a new link (admin only)
router.post("/add_link", (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const db = require("./Users");
  const user = db
    .prepare("SELECT role FROM users WHERE id = ?")
    .get(req.session.userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  const { icon, fallback, text, link } = req.body;
  if (!icon || !fallback || !text || !link) {
    return res.status(400).json({ message: "All fields are required" });
  }

  links.push({ icon, fallback, text, link });
  fs.writeFileSync(linksPath, JSON.stringify(links, null, 2), "utf-8");

  res.status(201).json({ message: "Bookmark added" });
});

// Delete a link by index (admin only)
router.delete("/links/:index", (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const db = require("./Users");
  const user = db
    .prepare("SELECT role FROM users WHERE id = ?")
    .get(req.session.userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  const idx = parseInt(req.params.index, 10);
  if (isNaN(idx) || idx < 0 || idx >= links.length) {
    return res.status(400).json({ message: "Invalid index" });
  }

  links.splice(idx, 1);
  fs.writeFileSync(linksPath, JSON.stringify(links, null, 2), "utf-8");

  res.json({ message: "Link deleted" });
});

module.exports = router;
