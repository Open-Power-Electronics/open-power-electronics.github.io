export const GITHUB_ORG_URL = "https://github.com/Open-Power-Electronics"

export const SECTION_IDS = {
  film: "film",
  parity: "parity",
  workflow: "workflow",
  mark: "mark",
  plugins: "plugins",
  privacy: "privacy",
  specs: "specs",
  team: "team",
} as const
export type SectionKey = keyof typeof SECTION_IDS

export const NAV_SECTIONS = ["workflow", "plugins", "privacy", "specs", "team"] as const satisfies readonly SectionKey[]
export type NavSection = (typeof NAV_SECTIONS)[number]

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
  workspace: { width: 1600, height: 564 },
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
