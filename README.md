# MicroHumanity (Starter)

A minimal Next.js starter for MicroHumanity.

## Run locally
1. Install Node.js 18+
2. In a terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import the repo in Vercel → Framework: Next.js → Deploy.

## Environment variables (optional for later)
Create a `.env.local` (not committed) for any secrets, e.g.:
```
NEXT_PUBLIC_SITE_NAME=MicroHumanity
```

## Project structure
- `pages/index.js` — Homepage with "Question of the Day" placeholder
- `pages/api/health.js` — Simple health endpoint (returns `{ok: true}`)
- `public/` — Static assets (favicon, logo placeholder)
