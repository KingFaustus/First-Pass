// GET /api/health -> tells the page whether live grading is available.
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    configured: Boolean(process.env.ANTHROPIC_API_KEY),
    needsCode: Boolean(process.env.ACCESS_CODE),
  }));
}
