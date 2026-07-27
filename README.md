# Vinit Sontakke — Portfolio

A dynamic, lightweight data-engineer portfolio built with **Astro 5 + Tailwind v4 + GSAP + Lenis**.
Features an animated "data-flow" constellation hero, custom cursor, smooth scroll, scroll-triggered reveals, animated skill bars, stat counters, and a project showcase.

## Develop
```bash
npm install
npm run dev      # http://localhost:4321
```

## Build
```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploy
Static output → deploy `dist/` to any host.

### Vercel (CLI)
```bash
npm i -g vercel
vercel           # first deploy (links project)
vercel --prod    # production
```

Or connect the repo on https://vercel.com — Astro is auto-detected.

## Edit content
All copy lives in **`src/data/portfolio.ts`** — profile, skills, experience, projects, education, stats.
Resume PDF is served from **`public/resume.pdf`** (replace to update).
