# OpenPE landing

Static promo site for OpenPE. Every product claim must be traceable to the OpenPE docs. Do not add claims.

## Stack

Vite 8, React 19, TypeScript 6, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react, oxlint. `cn()` is clsx + tailwind-merge. Fonts are self-hosted: Inter Variable (optical size axis) for text, JetBrains Mono Variable for technical labels. English is the default. Chinese is an explicit toggle stored in `localStorage` as `openpe-lang`. Never read `navigator.language`. All copy lives in `src/i18n/content.ts`; both languages share one typed shape. Author credits and circuit-map positions live in `src/content/team.ts`.

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

The hero and Team share an opaque warm stone-gray background (`#f1efeb`). The rest of the page uses white. Deep green accents and a low-contrast PCB pattern with distinct power routes, signal traces and pads run throughout the site. The hero fits its two-line title, download link, 16:9 film and technology credits into one viewport on standard displays. On very short viewports it stacks naturally. CHAPTERS in src/content/site.ts owns section order, title numbering and navigation anchors. A monospaced number and short rule sit above each chapter title. Use the tokens in src/index.css.

- Ink `#1F2622`, body `#505854`, muted `#7D8781`, hairline `#E3E8E4`, paper `#FAFCF9`, mint `#E7F1E9`, green `#206F39`, signal `#88EA5C` (dots and highlights only).
- Use `.window` for unframed captures that need a defined edge (radius 20px, hairline border, layered shadow).
- Motion follows native scroll. The workflow follows normal page flow. Its chapter buttons switch the demonstration and caption in place. The Team map uses transparent PCB geometry with school marks and full names connected to their projected locations, with film-style author credits. Respect prefers-reduced-motion for animation and clip autoplay.
- The mark SVG keeps its own painted colours; do not redraw it.

## Copy red lines

Do not claim general KiCad or model import, complete ERC/DRC, autorouting, production or manufacturing qualification, EMC compliance or emission prediction, junction temperature, or that Gerber means production ready. Thermal copy says PCB temperature. EMC is geometry review, not compliance. Marks are screenshots sent with the next message; they do not edit the design. DeepSeek Harness and Pi propose changes; the user applies them. The film chapter label stays `Module`.

## Media and review

The Workflow presents Schematic, Layout and Module clips. Layout follows placement and comments in one continuous example. The clips provide their own product card with space around it, and the player crossfades them without zooming. The crop rectangles live in `scripts/cut-clips.sh`, and `src/content/site.ts` records the output sizes. Regenerate with `scripts/cut-clips.sh <master>`. Keep the published fast-start film, clips and analysis stills derived from the same source. The source master stays outside this repository. `public/media/workspace.webp` is a lossless 2x capture of the real OpenPE desktop window (EMC Flyback, Layout view, T1 selected); its size lives in `WORKSPACE_SHOT` and the callout anchors in `src/components/Workspace.tsx` are percentages of that image, so recapturing means re-placing them. One pixel edit is applied to that capture: the composer status line "Could not load models." is painted over with the bar's own flat colour RGB (252, 252, 252) in the 2x rectangle (151, 1828)–(406, 1854) inclusive, then exported with `cwebp -lossless -exact -z 9`; repeat this on any recapture. Visual changes need owner review.
