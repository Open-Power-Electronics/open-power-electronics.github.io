export const GITHUB_ORG_URL = "https://github.com/Open-Power-Electronics"
export const OPENPE_REPO_URL = "https://github.com/Open-Power-Electronics/OpenPE"
export const OPENPE_RELEASES_URL = `${OPENPE_REPO_URL}/releases`

export const PLATFORMS = ["Windows x64", "macOS arm64", "Linux x64"] as const

export const FILM_ID = "film"

/** Page sections in navigation order. */
export const CHAPTERS = ["workspace", "workflow", "agents", "plugins", "team"] as const
export type Chapter = (typeof CHAPTERS)[number]

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

type ClipSpec = { width: number; height: number }

export const WORKFLOW_CLIP_SIZE = { width: 1360, height: 768 } as const

export const CLIPS = {
  spice: WORKFLOW_CLIP_SIZE,
  layout: WORKFLOW_CLIP_SIZE,
  case: WORKFLOW_CLIP_SIZE,
  thermal: { width: 1264, height: 720 },
  parasitics: { width: 1264, height: 720 },
} as const satisfies Record<string, ClipSpec>
export type ClipName = keyof typeof CLIPS

export function clipSources(name: ClipName) {
  return {
    webm: `/media/clips/${name}.webm`,
    mp4: `/media/clips/${name}.mp4`,
    poster: name === "parasitics" ? "/media/layout-parasitics.webp" : `/media/clips/${name}.jpg`,
    ...CLIPS[name],
  }
}
