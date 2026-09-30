// POST /api/grade  { prompt, code }  ->  { text }
// Calls the Claude API with the server's key. The key never reaches the browser.

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const MAX_PROMPT_CHARS = 200_000;

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { code: "method_not_allowed" });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return send(res, 503, { code: "not_configured" });

  const body = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
  const required = process.env.ACCESS_CODE;
  if (required && body.code !== required) return send(res, 401, { code: "unauthorized" });

  const prompt = String(body.prompt || "");
  if (!prompt) return send(res, 400, { code: "bad_request" });
  if (prompt.length > MAX_PROMPT_CHARS) return send(res, 413, { code: "prompt_too_large" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8000,
        system:
          "You grade short-answer responses for university teaching assistants. Follow the rubric exactly. When asked for JSON, reply with only valid JSON and no other text.",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("Claude API error", r.status, data?.error?.message);
      return send(res, r.status === 429 ? 429 : 502, { code: r.status === 429 ? "rate_limited" : "upstream_error" });
    }
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    return send(res, 200, { text });
  } catch (e) {
    console.error(e);
    return send(res, 502, { code: "upstream_error" });
  }
}

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(obj));
}
function safeJson(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
