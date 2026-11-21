export const GITHUB_ORG_URL = "https://github.com/Open-Power-Electronics"

export const CHAPTER_IDS = ["overall", "schematic", "layout", "module", "plugins"] as const
export type ChapterId = (typeof CHAPTER_IDS)[number]

export const NAV_IDS = ["features", "plugins", "privacy", "team"] as const
export type NavId = (typeof NAV_IDS)[number]

export const CHAPTER_SECTION_ID: Record<ChapterId, string> = {
  overall: "overall",
  schematic: "schematic",
  layout: "layout",
  module: "module",
  plugins: "plugins",
}

export const NAV_SECTION_ID: Record<NavId, string> = {
  features: "features",
  plugins: "plugins",
  privacy: "privacy",
  team: "team",
}

export const FILM_TIME_SECONDS: Record<ChapterId, number> = {
  overall: 0,
  schematic: 26,
  layout: 44,
  module: 65,
  plugins: 80,
}

export const CLIP_NAMES = [
  "intro",
  "architecture",
  "agents",
  "workspace",
  "spice",
  "placement",
  "comment",
  "case",
  "plugins",
  "thermal",
  "parasitics",
] as const
export type ClipName = (typeof CLIP_NAMES)[number]

export const FILM_SRC = "/media/openpe-workflow-demo.mp4"
export const FILM_POSTER = "/media/openpe-workflow-demo.jpg"

export function clipSources(name: ClipName): { webm: string; mp4: string; poster: string } {
  return {
    webm: `/media/clips/${name}.webm`,
    mp4: `/media/clips/${name}.mp4`,
    poster: `/media/clips/${name}.jpg`,
  }
}

export function parseChapterId(value: string | undefined): ChapterId {
  switch (value) {
    case "overall":
    case "schematic":
    case "layout":
    case "module":
    case "plugins":
      return value
    default:
      throw new Error(`unknown chapter: ${String(value)}`)
  }
}

export function parseNavId(value: string | undefined): NavId {
  switch (value) {
    case "features":
    case "plugins":
    case "privacy":
    case "team":
      return value
    default:
      throw new Error(`unknown nav section: ${String(value)}`)
  }
}
