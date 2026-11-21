import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "./index.css"

const root = document.getElementById("root")
if (root === null) throw new Error("missing #root")

hydrateRoot(
  root,
  <StrictMode>
    <App />
  </StrictMode>,
)
