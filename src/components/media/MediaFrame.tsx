import type { ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

export function MediaFrame(props: { children: ReactNode; className?: string }) {
  return <div className={cn("pe-card overflow-hidden bg-white", props.className)}>{props.children}</div>
}
