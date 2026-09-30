// Local server: `npm start`, then open http://localhost:3000
// Serves public/ and the same /api handlers used on Vercel. No dependencies.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import grade from "./api/grade.js";
import health from "./api/health.js";

const dir = path.dirname(fileURLToPath(import.meta.url));

// Load .env if present
const envFile = path.join(dir, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api/health") return health(req, res);
  if (url.pathname === "/api/grade") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    try { req.body = JSON.parse(raw || "{}"); } catch { req.body = {}; }
    return grade(req, res);
  }
  if (url.pathname === "/" || url.pathname === "/index.html") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(await readFile(path.join(dir, "public", "index.html")));
  }
  res.statusCode = 404;
  res.end("Not found");
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`First Pass running at http://localhost:${port}`));
