# cms1500-react Documentation Site — Design

**Date:** 2026-10-29
**Repo:** `cms-1500-documentation`
**Author/owner:** Rajkumar Rathod

## Intent & Why

`cms1500-react` is a production-ready React library for filling, rendering, and
printing CMS-1500 (HCFA) medical claim forms as real PDFs. It currently has only
a README. We want a modern, polished documentation website that makes the library
feel professional and gets a developer productive within the first minute.

The site should visually mirror the reference site
(https://hook-toolkit-document-8azd.vercel.app/) — a single-page, dark-first,
sidebar + hero + live-demo-card layout. The reference's defining trait is **live,
interactive demos**, and we will carry that trait over: visitors can edit claim
data and watch a real, filled CMS-1500 PDF render in the browser.

**Success looks like:** a developer lands, sees a live filled PDF, copies the
install line and a snippet, and understands the whole API by scrolling one page.

## Goals

- Pixel-faithful recreation of the reference site's visual language (layout,
  color tokens, typography, components, interactions).
- Dark theme by default with a working light-theme toggle (persisted).
- **Full live demos**: bundle the real `cms1500-react` library so demos generate
  actual filled PDFs client-side (via `pdf-lib`, matching how the library works).
- Document the complete public API (every export in `src/index.ts`).
- Deploy to Vercel; auto-deploy on git push.
- Responsive: sidebar collapses to a drawer on mobile.

## Non-Goals

- No backend/server — the library is client-side only; so is the docs site.
- No multi-page router / MDX content system — single long page with anchored
  sections and sticky-sidebar navigation (same as the reference).
- No auth, no analytics, no telemetry (consistent with the library's zero-PHI,
  no-tracking stance).
- Not re-documenting pdf-lib internals or CMS-1500 regulatory guidance beyond
  what the library surfaces.

## Anti-Goals (would make this a failure even if it "works")

- Looking like a generic Docusaurus/template site instead of the reference's
  distinct look.
- Static-only code blocks with no live PDF — that would lose the whole point.
- Demos that call out to a network or persist PHI — must stay fully client-side
  and in-memory, matching the library's HIPAA posture.
- A sample claim that uses a real person's data — use obviously-synthetic data.

## Constraints

- **Stack:** Vite + React + TypeScript (matches reference; enables embedding the
  real React library).
- **Deploy:** Vercel.
- **Dependencies:** `cms1500-react` (currently v1.3.0, published on npm) + its
  peer `pdf-lib`, plus React. Install `cms1500-react` from npm.
- **PDF rendering in demos:** use the library's own `useCMS1500` hook / `CMS1500Form`
  component, which render the filled PDF into an `<iframe>` via a blob URL —
  works entirely in the browser.
- Reproduce the reference's design tokens exactly (captured from its CSS):
  - Dark: `--bg #0b0d12`, `--panel #161a23`, `--border #272d3a`, `--text #e7eaf0`,
    `--text-dim #9aa4b5`, accent `--accent #7c6cff` / `--accent-2 #9b8cff`,
    status `--green #3ecf8e` `--amber #f0b429` `--red #ff6b6b` `--blue #4aa8ff`.
  - Light: `--bg #f7f8fb`, `--panel #fff`, `--text #1a2030`, accent `#6d5efc`.
  - `--radius 12px`; sans = system stack; mono = SFMono/JetBrains/Fira.
  - Hero `h1` gradient; eyebrow pill; mono nav links; `.demo` cards with a
    two-column body (live left, code pane right); syntax-highlight token colors
    (`key #c27bff`, `fn #4aa8ff`, `str #3ecf8e`, `com dim`, `num #f0b429`);
    sticky topbar with icon buttons; toast; mobile drawer at ≤900px.

## Information Architecture (sidebar nav groups → sections)

The content maps 1:1 onto the library's public API and README.

- **Getting Started**
  - Overview (hero: eyebrow, gradient headline, lead, `npm install cms1500-react pdf-lib`,
    stat row — e.g. "33 form boxes", "0 network calls", "FHIR R4", "MIT"), plus a
    flagship live demo right under the hero.
  - Installation (install command + peer deps note + "zero config / template bundled").
  - Quick Start (the three usage modes from the README: component, hook, headless).
- **Components**
  - `<CMS1500Form />` — live demo + props table.
- **Hooks**
  - `useCMS1500()` — live demo with Print/Download buttons + return-value table.
- **Headless / Core**
  - `fillCMS1500Pdf()` — code + explanation (Node/worker usage).
  - Template helpers — `getEmbeddedTemplate`, `TEMPLATE_ASSET_PATH`,
    `TEMPLATE_FILENAME`.
- **FHIR**
  - `mapFHIRToCMS1500()` — FHIR R4 bundle → CMS1500Data, live demo mapping a
    sample bundle then rendering the PDF.
- **Data Reference**
  - `CMS1500Data` full field reference (the big annotated JSONC from the README,
    grouped by form area, syntax-highlighted; plus the Minimal Example).
  - Advanced constants (`DIAGNOSIS_FIELDS`, `SERVICE_LINE_FIELDS`, etc.) for
    custom field mapping.
- **Compliance**
  - HIPAA section (condensed from README: zero-PHI table, data-flow diagram,
    recommended practices, disclaimer).
- **Footer**: license, npm link, GitHub repo link, author.

## The Flagship Live Demo (the centerpiece)

A card near the top with the reference's two-column body:

- **Left (live):** a compact editable form — a few key fields (patient name, DOB,
  sex, insurance ID, one diagnosis code, one service line w/ CPT + charge) pre-filled
  with synthetic data, plus Print and Download buttons. Below it, the actual filled
  CMS-1500 PDF rendered in an iframe (via `useCMS1500` / `CMS1500Form`).
- **Right (code):** the exact snippet that produces what's on the left, with a copy
  button.

Editing a field re-generates the PDF live. This is the "see it work in 10 seconds"
moment. Status pill (idle / generating / ready) reuses the reference's `.pill`
component and its pulse animation.

## Build Approach (left to the builder, but the intended shape)

- Scaffold Vite React-TS. Single `App.tsx` composing `Sidebar`, `TopBar`, `Hero`,
  section components, `Footer`, `Toast`.
- Port the reference's CSS wholesale into `index.css` with the captured tokens,
  then adapt class usage. (We have the full reference stylesheet.)
- A small `CodeBlock` component with manual token-span highlighting (matching the
  reference's `.tok-*` classes) + copy-to-clipboard + toast.
- A `Demo` card wrapper (`demo-head` / `demo-body` / `demo-live` / `demo-code-pane`).
- Theme toggle via `data-theme` on `<html>`, persisted to `localStorage`
  (allowed here — the docs site holds no PHI; only a theme preference).
- Scroll-spy to set the active sidebar link.
- `vercel.json` / default Vite output for SPA deploy; README for the docs repo.

## Resolved During Review (reviewer flags, settled)

- **npm version:** `cms1500-react@1.3.1` is published on npm with the embedded-template
  + `useCMS1500` iframe/blob API the demos require. Pin `^1.3.0`. No local linking
  or pre-publish needed.
- **Reference CSS source:** the complete reference stylesheet is saved at
  `docs/superpowers/reference/reference-site.css` — the builder ports from this
  real file, not from the token list alone, so "pixel-faithful" is achievable.
- **Demo control model:** live demos are driven by the `useCMS1500` hook with
  local form state + a debounced `generatePdf(data)` on edit (not the props-only
  `<CMS1500Form>` component), which is what enables edit-and-re-render. The status
  pill is wired to the hook's `loading`/`pdfUrl`.

## Open Decisions Deferred to the Builder

- Exact copy/wording of section intros (derive faithfully from the README).
- Which subset of fields appears in the flagship editable form (pick the most
  illustrative minimal set).
- Whether to pin `cms1500-react` to `^1.3.0` or a fixed version (builder's call;
  default `^1.3.0`).
