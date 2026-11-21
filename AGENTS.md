# OpenPE landing

Static promo site for OpenPE. Every product claim must be traceable to the OpenPE docs. Do not add claims.

## Stack

Vite 8, React 19, TypeScript 6, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-react, oxlint. `cn()` is clsx + tailwind-merge. shadcn/ui is configured and used only where a component is needed. English is the default. Chinese is an explicit toggle stored in `localStorage` as `openpe-lang`. Never read `navigator.language`.

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

## Tokens

Page `#FFFFFF` with mint corner radials (`#E7F1E9`, `#F7FBF7`, `#F1F7F0`, `#F3F8F4`). Green `#206F39`. Headlines `#1F2622` / `#363D39`. Body `#505854`. Inactive nav `#57665C`. Logo highlight `#88EA5C` (the mark SVG keeps its own painted green; do not redraw it). Cards `#FAFCF9` / `#FFFFFF`, 1px border `#DEE3DF`, radius 20px. Selection `#1E6C36`. Architecture: Agent `#E6EFFC`, Human `#DFF1F2`, Uniform API `#EBE3F6`, Core `#ECF5E9`, Plugins `#F8EBE4`. Chart: Baseline `#A36734`, Tuned `#39784E`, ±1% band `#EAF7EC`. Stat bar `#A15C34`. Inter, headline weight 800, tracking tight near 0, line-height about 1.15. The hero title is Title Case on three lines; the middle line is green. Section titles are sentence case.

## Copy red lines

Do not claim general KiCad or model import, complete ERC/DRC, autorouting, production or manufacturing qualification, EMC compliance or emission prediction, junction temperature, or that Gerber means production ready. Thermal copy says PCB temperature. EMC is geometry review, not compliance. Marks are screenshots sent with the next message; they do not edit the design. DeepSeek Harness and Pi propose changes; the user applies them. The chapter label stays `Module`.

## Media and review

Regenerate clips with `scripts/cut-clips.sh <master>`. The master path is required. Outputs land in `public/media/`. Do not commit the master. Visual changes need owner review. This repo cannot confirm that the page matches the promo film.
