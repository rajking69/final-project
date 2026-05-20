const path = require("path");
const fs = require("fs");

// Load .env (not committed to GitHub)
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eq = trimmed.indexOf("=");
      if (eq > 0) {
        process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
      }
    });
}

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 3000;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Copy .env.example to .env and add your connection string.");
}

module.exports = { MONGODB_URI, PORT };
