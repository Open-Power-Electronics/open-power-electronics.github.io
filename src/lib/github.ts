import { OPENPE_REPO_URL } from "../content/site.ts"

const repositoryApi = `https://api.github.com/repos${new URL(OPENPE_REPO_URL).pathname}`
// Solver artifacts share the Releases tab. Desktop releases use v-prefixed version tags.
const appVersionTag = /^v\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?(?:\+[a-zA-Z0-9.-]+)?$/

type Release = {
  draft?: unknown
  tag_name?: unknown
  published_at?: unknown
}

async function requestGitHub(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal, headers: { Accept: "application/vnd.github+json" } })
  if (!response.ok) throw new Error(`GitHub request failed (${response.status})`)
  return response
}

export async function getRepositoryStars(signal: AbortSignal): Promise<number | undefined> {
  const response = await requestGitHub(repositoryApi, signal)
  const repository: { stargazers_count?: unknown } | null = await response.json()
  const count = repository?.stargazers_count
  if (typeof count === "number" && Number.isSafeInteger(count) && count >= 0) return count
}

export async function getLatestAppRelease(signal: AbortSignal): Promise<string | undefined> {
  let newestTag: string | undefined
  let newestPublishedAt = -Infinity

  for (let page = 1; ; page++) {
    const response = await requestGitHub(`${repositoryApi}/releases?per_page=100&page=${page}`, signal)
    const releases: unknown = await response.json()
    if (!Array.isArray(releases)) throw new Error("GitHub returned an invalid release list")

    for (const release of releases as (Release | null)[]) {
      if (release?.draft !== false) continue
      const { tag_name: tag, published_at: publishedAt } = release
      if (typeof tag !== "string" || !appVersionTag.test(tag) || typeof publishedAt !== "string") continue

      const timestamp = Date.parse(publishedAt)
      if (timestamp > newestPublishedAt) {
        newestTag = tag
        newestPublishedAt = timestamp
      }
    }

    if (!response.headers.get("link")?.includes('rel="next"')) return newestTag
  }
}
