# Hero Carousel – Behavior Summary

**Handoff note for developers.**

## Auto-play

- **Interval:** Slides advance automatically every **6 seconds** (`intervalMs={6000}` in `SplashPage.tsx`). Set to `0` to disable auto-advance.
- **No pause on hover:** Auto-play continues when the user hovers; there is no pause/resume.
- **Loop:** After the last slide it goes to the first (and vice versa for prev).

## Transitions

- **Background images:** Two layers alternate. The incoming slide’s background fades in with **opacity 0.6s ease-in**; the outgoing fades out over the same duration (crossfade).
- **Foreground (copy + CTA):** The active slide’s content uses **opacity 0.5s ease-in** and `visibility` for the switch. Only one slide’s content is visible at a time; no sliding or sliding animation.

## Navigation

- **Dots:** Below the content; click to jump to a slide. Active dot is highlighted.
- **Prev/next arrows:** Shown on **desktop only** (hidden below 768px). Click to go to previous or next slide.
- **Accessibility:** Dots and arrows have appropriate `aria-label` / `aria-current`; slide content uses `aria-hidden` on inactive slides.

## CTA (`.hero-carousel__cta`) positioning

- **Goal:** The CTA button stays in a fixed vertical position so it doesn’t jump when switching slides (headline/subtitle length varies).
- **How:** The slide (`.hero-carousel__slide`) is a flex column with a **min-height** (380px desktop, 320px mobile, 260px at 768–900px). The CTA has **`margin-top: auto`**, so it sits at the bottom of the slide. The space between the last line of copy and the CTA is flexible: shorter copy gets more gap, longer copy gets less. The button itself stays anchored at the bottom of the slide.
- **Content area:** `.hero-carousel__content` uses `justify-content: center` and padding (e.g. 160px top, 80px bottom) so the whole slide block is positioned; within the slide, the CTA is always at the bottom.

## Layout / responsive

- **Desktop:** Fixed aspect ratio (1440×798), max-height 90vh. Content vertically centered; CTA position stable via min-height + `margin-top: auto` on the slide.
- **Mobile (≤767px):** Aspect ratio removed; min-height 85vh. Arrows hidden; dots only. Tagline/headline/subtitle max-width 360px for consistent line breaks.
- **768–900px:** Tighter slide min-height and padding so the block doesn’t sit too high; CTA gap reduced.

## Config (SplashPage)

- `intervalMs={6000}` — auto-advance every 6s  
- `showAuthButtons={false}` — header Log in / Sign up hidden  
- Slides and banner text are defined in `HERO_CAROUSEL_SLIDES` and props in `SplashPage.tsx`.

## Files

- **Component:** `picnic-splash/src/HeroCarousel.tsx`
- **Styles:** `picnic-splash/src/HeroCarousel.css`
- **Usage:** `picnic-splash/src/SplashPage.tsx` (hero section)
