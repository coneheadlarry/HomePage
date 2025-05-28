const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const widgetsPath = path.join(__dirname, "widgets.json");

// Get current widget selection
router.get("/api/widgets", (req, res) => {
  const widgets = JSON.parse(fs.readFileSync(widgetsPath, "utf-8"));
  res.json(widgets);
});

// Set widget selection (admin only)
router.post("/api/widgets", (req, res) => {
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
  const { widgets } = req.body;
  if (!Array.isArray(widgets)) {
    return res.status(400).json({ message: "Widgets must be an array" });
  }
  fs.writeFileSync(widgetsPath, JSON.stringify(widgets, null, 2), "utf-8");
  res.json({ message: "Widgets updated" });
});

module.exports = router;
