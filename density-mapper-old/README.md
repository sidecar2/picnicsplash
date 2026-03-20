# Picnic Route Sandbox (density-mapper)

Map-first prototype for simulating courier throughput and unit economics in Downtown Los Angeles.

## Setup

1. **Open the project folder** (not the parent): `cd /Users/andrew/density-mapper`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and set your Mapbox token. Get one at [Mapbox](https://account.mapbox.com/).
4. **From inside `density-mapper`**, run: `npm run dev`
5. In the terminal you should see **Next.js** and a line like `Local: http://localhost:3000`. Open that URL in your browser.

If you run `npm run dev` from the parent folder (`picnic-eater-components`), a different app (Vite) will start instead. See `TROUBLESHOOTING.md` if the page is blank.

## Features

- **Map**: Centered on DTLA with ~60 mock restaurant points (internal / partner / selection), color-coded with a legend. A subtle density overlay updates when you change sliders.
- **Controls**: 16 sliders (throughput, restaurant/reliability, economics), each defaulting to the midpoint of its range. Changing any slider immediately updates the metrics panel and the map overlay.
- **Metrics**: Zone performance (orders/courier/hr, batch size, cycle time, demand density) and economics (cost/order, contribution, refund cost, net contribution).

No database or backend; all data is in-memory.

## Deploy (go live)

**Vercel** (recommended for Next.js):

- **CLI:** From the project root run `npx vercel`, follow the prompts, then add `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` in the Vercel dashboard under your project → Settings → Environment Variables.
- **Git:** Push this repo to GitHub (or GitLab/Bitbucket), then:
  1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** and import the repo.
  2. In **Environment Variables**, add `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` with your Mapbox public token from [Mapbox](https://account.mapbox.com/).
  3. Deploy. Vercel will run `npm run build` and host the app.

Your app will get a URL like `https://density-mapper-xxx.vercel.app`. Mapbox tokens are safe to expose in the client (`NEXT_PUBLIC_*`); restrict the token to your Vercel domain in the Mapbox dashboard if you want.

**Other hosts:** Any platform that supports Next.js (Node 18+) works: set the same env var and use `npm run build` then `npm run start`, or use their Next.js preset if available.
