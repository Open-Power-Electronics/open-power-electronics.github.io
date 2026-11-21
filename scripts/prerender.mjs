import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

if (process.env.NODE_ENV !== "production") {
  throw new Error("prerender requires NODE_ENV=production")
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const serverEntry = resolve(root, "dist-ssr/entry-server.js")
const htmlPath = resolve(root, "dist/index.html")

if (!existsSync(serverEntry)) {
  throw new Error(`missing server bundle: ${serverEntry}`)
}
if (!existsSync(htmlPath)) {
  throw new Error(`missing client html: ${htmlPath}`)
}

const server = await import(pathToFileURL(serverEntry).href)
if (typeof server.render !== "function") {
  throw new Error("dist-ssr/entry-server.js has no render function")
}

const appHtml = server.render()
if (typeof appHtml !== "string" || appHtml.length === 0) {
  throw new Error("prerender returned empty markup")
}
if (!appHtml.includes("Power Electronics")) {
  throw new Error("prerender markup is missing the hero title")
}

const template = readFileSync(htmlPath, "utf8")
const title = "<title>OpenPE · AI-Native Power Electronics Engineer Workbench</title>"
if (!template.includes(title)) {
  throw new Error("dist/index.html title does not match the English page title")
}
const marker = '<div id="root"></div>'
const markerCount = template.split(marker).length - 1
if (markerCount !== 1) {
  throw new Error(`expected one #root marker, found ${markerCount}`)
}

const next = template.replace(marker, `<div id="root">${appHtml}</div>`)
writeFileSync(htmlPath, next)
