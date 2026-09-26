# Cafe site template (React + Vite + Tailwind)

## Run locally
```
npm install
npm run dev
```

## Customize for a new client
Edit `src/cafe.json` only — name, WhatsApp number, address, hours, and the menu array.
Nothing else needs to change for a basic reskin.

## Build for deployment
```
npm run build
```
This outputs a `dist/` folder — that's what you deploy.

## Deploy (pick one, all free for this use case)
- **Cloudflare Pages** — connect the GitHub repo, build command `npm run build`, output folder `dist`.
- **Netlify** — same settings, or drag-and-drop the `dist` folder at app.netlify.com/drop for a one-off demo.
- **Vercel** — `vercel` CLI or import the repo; it auto-detects Vite.

Add a custom domain from any of these dashboards later.
