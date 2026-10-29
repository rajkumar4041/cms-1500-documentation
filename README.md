# cms1500-react — documentation site

The documentation site and live demos for
[`cms1500-react`](https://www.npmjs.com/package/cms1500-react) — a production-ready React
library for filling, rendering, and printing CMS-1500 (HCFA) medical claim forms as real PDFs.

The site embeds the actual published library, so the demos generate real filled CMS-1500 PDFs
entirely in the browser — no backend, no network calls.

## Tech stack

- **Vite + React + TypeScript**
- **cms1500-react** + **pdf-lib** (the library being documented, rendering live)
- **Vitest** + Testing Library for the logic units

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm test         # run the unit tests
```

## Project layout

```
src/
  App.tsx              page composition (hero + flagship demo + sections)
  index.css            design system (ported from the reference site) + docs additions
  components/          TopBar, Sidebar, Hero, Demo, CodeBlock, Footer, LiveClaimDemo, ui
  sections/            one component per documentation section
  lib/                 highlight, useDebounce, useScrollSpy, nav, theme, snippets, sampleClaim
```

## Deployment

Deploys to **Vercel** with the Vite framework preset (see `vercel.json`). Vercel runs
`npm run build` and serves `dist/`; the SPA rewrite routes all paths to `index.html`.

## License

MIT © Rajkumar Rathod
