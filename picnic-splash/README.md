# Picnic Splash

Marketing splash page for Picnic (Figma: [Picnic Product Marketing](https://www.figma.com/design/Rn3F67En6sWzBYl6p4yFnq/Picnic-Product-Marketing?node-id=680-2374)).

Uses the parent `picnic-eater-components` library for the store carousel.

## Setup

From the **picnic-eater-components** repo root:

1. Build the component library (once):
   ```bash
   npm run build
   ```
2. Go into the splash app and run it:
   ```bash
   cd picnic-splash
   npm install
   npm run dev
   ```

Open http://localhost:5173 (or the port Vite prints).

### New assets not refreshing?

Do a **hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows). Image URLs get a new cache-bust query on every full page load, so the latest assets load.
