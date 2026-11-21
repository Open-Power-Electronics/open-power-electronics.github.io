export const GITHUB_ORG_URL = "https://github.com/Open-Power-Electronics"

export const FILM_ID = "film"

/** Numbered chapters in page order. Each id is the section anchor and the nav entry. */
export const CHAPTERS = ["workspace", "workflow", "agents", "plugins", "privacy", "specs", "team"] as const
export type Chapter = (typeof CHAPTERS)[number]

function chapterOrdinal(chapter: Chapter): number {
  return CHAPTERS.indexOf(chapter) + 1
}

export function chapterNumber(chapter: Chapter): string {
  return String(chapterOrdinal(chapter)).padStart(2, "0")
}

/** Subsections drop the chapter's leading zero: `2.1`, not `02.1`. */
export function subsectionNumber(chapter: Chapter, index: number): string {
  if (!Number.isInteger(index) || index < 0) throw new Error(`invalid subsection index: ${index}`)
  return `${chapterOrdinal(chapter)}.${index + 1}`
}

export const PLATFORMS = ["Windows x64", "macOS arm64", "Linux x64"] as const

export const AGENT_MODES = {
  tools: ["Codex", "Claude Code", "Cursor"],
  proposals: ["DeepSeek Harness", "Pi"],
} as const

/** 2x capture of the OpenPE desktop: EMC Flyback in Layout with T1 selected. */
export const WORKSPACE_SHOT = {
  src: "/media/workspace.webp",
  width: 2960,
  height: 1898,
} as const

export const FILM = {
  src: "/media/openpe-workflow-demo.mp4",
  poster: "/media/openpe-workflow-demo.jpg",
  durationSeconds: 98,
} as const

export const FILM_CHAPTERS = [
  { id: "overall", start: 0 },
  { id: "schematic", start: 26 },
  { id: "layout", start: 44 },
  { id: "module", start: 65 },
  { id: "plugins", start: 80 },
] as const
export type FilmChapterId = (typeof FILM_CHAPTERS)[number]["id"]

type ClipSpec = { width: number; height: number }

export const CLIPS = {
  intro: { width: 1050, height: 748 },
  spice: { width: 1260, height: 724 },
  placement: { width: 1260, height: 724 },
  comment: { width: 1260, height: 724 },
  case: { width: 1260, height: 724 },
  thermal: { width: 1260, height: 724 },
  parasitics: { width: 1260, height: 724 },
} as const satisfies Record<string, ClipSpec>
export type ClipName = keyof typeof CLIPS

export function clipSources(name: ClipName) {
  return {
    webm: `/media/clips/${name}.webm`,
    mp4: `/media/clips/${name}.mp4`,
    poster: `/media/clips/${name}.jpg`,
    ...CLIPS[name],
  }
}
