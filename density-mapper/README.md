# Picnic Hubs DTLA (density-mapper)

Map-first prototype for courier throughput and unit economics in Downtown LA.

## Run

From this folder only:

```bash
cd /Users/andrew/picnic-eater-components/density-mapper
npm run dev
```

Then open **http://localhost:3000** (dev server is set to port 3000).

## Setup

- **Mapbox**: `.env.local` with `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (already set from backup).
- No database; all data is in-memory mock.

## Old project

The previous version was moved to `density-mapper-old` in the same repo.
