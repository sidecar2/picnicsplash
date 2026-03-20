# Troubleshooting – Picnic Route Sandbox

## Page is blank or “doesn’t load”

### 1. You must run the server from the density-mapper folder

This app is **Next.js**. The parent folder **picnic-eater-components** uses **Vite** (`npm run dev` there starts a different app). So “Ready in 549ms” might be Vite, not this app.

**Do this:**

1. Stop any running dev server (Ctrl+C).
2. Open a terminal and go **into** the project:
   ```bash
   cd /Users/andrew/density-mapper
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. You should see **Next.js** in the output, e.g.:
   ```text
   ▲ Next.js 16.x.x
   - Local: http://localhost:3000
   ```
5. Open that URL in your browser.

If you run `npm run dev` from **picnic-eater-components**, you are not running this app.

### 2. Confirm the dev server is running

- You should see something like: `▲ Next.js 16.x.x - Local: http://localhost:3000`
- If nothing is running, start it with `npm run dev` from `/Users/andrew/density-mapper`.
- If port 3000 is in use, Next.js may use 3001 (or another port). Use the URL shown in the terminal.

### 3. Check the browser

- Open the exact URL from the terminal (e.g. **http://localhost:3000**).
- Do a hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows).
- Open **Developer Tools** (F12 or Cmd+Option+I) → **Console** tab. Look for red errors (e.g. Mapbox token, network, or JavaScript errors).

### 4. Mapbox token

If you see “Mapbox token missing” on the map area:

- Create **`.env.local`** in the project root (`/Users/andrew/density-mapper/.env.local`).
- Add:  
  `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token_here`
- Restart the dev server (`Ctrl+C`, then `npm run dev` again). Env vars are read at startup only.

### 5. Reinstall and rebuild

From the project folder:

```bash
cd /Users/andrew/density-mapper
rm -rf node_modules .next
npm install
npm run dev
```

### 6. Still blank?

- In the browser console, note any error messages and fix those first.
- Ensure you’re not blocking JavaScript or running an old cached build; try an incognito/private window and open `http://localhost:3000` again.
