const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];

const configuredClientUrls = (process.env.CLIENT_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultAllowedOrigins, ...configuredClientUrls]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no Origin header) and explicitly allowed frontend origins.
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", commentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
