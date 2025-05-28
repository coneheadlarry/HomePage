require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONT_HOST,
    credentials: true,
  })
);

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

// Auth routes
const authRoutes = require("./auth");
app.use(authRoutes);

// Links routes
const linksRoutes = require("./links");
app.use(linksRoutes);

// widget routes
const widgetsRoutes = require("./widgets");
app.use(widgetsRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
