# OpenPE landing

Static promo site for OpenPE. Every product claim must be traceable to the OpenPE docs. Do not add claims.

## Stack

Vite 8, React 19, TypeScript 6, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react, oxlint. `cn()` is clsx + tailwind-merge. Fonts are self-hosted: Inter Variable (optical size axis) for text, JetBrains Mono Variable for technical labels. English is the default. Chinese is an explicit toggle stored in `localStorage` as `openpe-lang`. Never read `navigator.language`. All copy lives in `src/i18n/content.ts`; both languages share one typed shape. Team and contact data live in `src/content/team.ts`; empty strings render nothing.

## Commands

```bash
source ~/.nvm/nvm.sh && nvm use 24
npm ci
npm run dev
npm run lint
npm run build
npm run preview -- --port 4173
scripts/cut-clips.sh /absolute/path/to/OpenPE-Workflow-Demo.mp4
```

`npm run build` typechecks, builds the client, builds the server bundle, and prerenders `dist/index.html`.

## Design

The page follows the promo film: white paper with mint corner radials, deep green accents, extra-bold tight headlines, and a datasheet-like layer of mono labels, hairlines and numbered chapters. `CHAPTERS` in `src/content/site.ts` is the single ordered list behind section anchors, nav entries and chapter numbers; a chapter marker shows its number and nav name (`03 Agents`) and subsections use decimal numbers (`03.1`). Lists inside a subsection are not numbered. Tokens are defined once in `src/index.css` under `@theme`; use them instead of raw hex values.

- Ink `#1F2622`, body `#505854`, muted `#7D8781`, hairline `#E3E8E4`, paper `#FAFCF9`, mint `#E7F1E9`, green `#206F39`, signal `#88EA5C` (dots and highlights only).
- Architecture blocks: Agent `#E6EFFC`, Human `#DFF1F2`, Uniform API `#EBE3F6`, Core `#ECF5E9`, Plugins `#F8EBE4`. Chart: Baseline `#A36734`, Tuned `#39784E`, ±1% band `#EAF7EC`.
- Media sits in `.window` frames (radius 20px, hairline border, layered shadow). The hero board uses `mix-blend-multiply` so its white surround disappears.
- Motion: `.rise` on first paint, `[data-reveal]` on scroll, travelling dots on `.wire`. Everything is disabled under `prefers-reduced-motion`.
- The mark SVG keeps its own painted colours; do not redraw it.

## Copy red lines

Do not claim general KiCad or model import, complete ERC/DRC, autorouting, production or manufacturing qualification, EMC compliance or emission prediction, junction temperature, or that Gerber means production ready. Thermal copy says PCB temperature. EMC is geometry review, not compliance. Marks are screenshots sent with the next message; they do not edit the design. DeepSeek Harness and Pi propose changes; the user applies them. The film chapter label stays `Module`.

## Media and review

Clips are cropped to the product media inside each film card; the crop rectangles live in `scripts/cut-clips.sh`, and `src/content/site.ts` records the output sizes. Regenerate with `scripts/cut-clips.sh <master>`; the master path is required and the master is never committed. `public/media/workspace.webp` is a lossless 2x capture of the real OpenPE desktop window (EMC Flyback, Layout view, T1 selected); its size lives in `WORKSPACE_SHOT` and the callout anchors in `src/components/Workspace.tsx` are percentages of that image, so recapturing means re-placing them. Visual changes need owner review.
