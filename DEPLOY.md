# Deploying First Pass

Technical setup notes. For an overview of what First Pass does, see the [README](README.md).

Without an API key, the site runs in demo mode with example answers already graded.

## Put it online (Vercel, about 10 minutes)

1. This code lives in the `First-Pass` GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New → Project**, and import the `First-Pass` repository. Keep the default settings.
3. Before deploying, open **Environment Variables** and add:
   - `ANTHROPIC_API_KEY`: your key from [console.anthropic.com](https://console.anthropic.com) (add a small amount of credit there)
   - `ACCESS_CODE`: any word or phrase; share it only with people you want grading
4. Click **Deploy**. You get a URL like `first-pass.vercel.app`. You can add a custom domain later under **Settings → Domains**.

If you change environment variables later, redeploy for them to take effect.

## Run it on your own computer

Requires Node.js 18 or newer.

```
cp .env.example .env      # then paste your API key into .env
npm start
```

Open http://localhost:3000.

## How it works

- `public/index.html`: the whole app (setup, review, insights). Nothing is stored on the server; data stays in the browser tab until you export the CSV.
- `api/grade.js`: sends the grading prompt to the Claude API with your key, which never reaches the browser.
- `api/health.js`: tells the page whether live grading is available and whether an access code is required.

Answers are graded in batches of five. Each batch is one API call, so a class of 100 answers is about 20 calls.

## Before using real student work

- Use anonymized IDs, not names or student numbers.
- Student text is sent to Anthropic's API for processing. Check your school's AI and FERPA policies, and the course instructor's rules, before grading live submissions.
- Keep the TA as the final grader. The tool only suggests.
