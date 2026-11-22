import type { CSSProperties, ReactNode } from "react"
import { CHAPTERS, type Chapter } from "@/content/site.ts"
import { cn } from "@/lib/utils.ts"

export function ChapterSection({ chapter, className, children }: { chapter: Chapter; className?: string; children: ReactNode }) {
  return (
    <section id={chapter} aria-labelledby={chapter + "-heading"} className={cn("chapter-section relative border-t border-line", className)}>
      {children}
    </section>
  )
}

export function SectionHeader({
  chapter,
  title,
  lede,
  className,
}: {
  chapter: Chapter
  title: string
  lede?: ReactNode
  className?: string
}) {
  const number = String(CHAPTERS.indexOf(chapter) + 1).padStart(2, "0")

  return (
    <header data-reveal className={cn("chapter-heading max-w-[800px]", className)}>
      <span className="chapter-index" aria-hidden="true">{number}</span>
      <h2 id={chapter + "-heading"} className="heading chapter-title text-balance">{title}</h2>
      {lede !== undefined && <p className="chapter-lede lede max-w-[620px] text-pretty">{lede}</p>}
    </header>
  )
}

export function revealDelay(seconds: number): CSSProperties {
  return { "--reveal-delay": `${seconds}s` } as CSSProperties
}

export function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img src="/brand/openpe-mark.svg" alt="" width={28} height={28} className="size-7" />
      <span className="text-[19px] font-bold tracking-[-0.03em] text-ink">OpenPE</span>
    </span>
  )
}
