# Splash Store Carousel – Viewport Behavior

**Handoff note for developers.**

- **Viewport:** Full-width window with `overflow: hidden`; only the visible strip of cards is shown.
- **Scroll:** Store list is duplicated so the track is 2× content width. Animation scrolls left by 50% over 60s (linear, infinite), so the loop is seamless.
- **Stagger:** Every other card has 80px top margin for a staggered strip.

**Files:** `SplashStoreCarousel.tsx`, `SplashStoreCarousel.css`; used in `SplashPage.tsx` (store ticker section).
