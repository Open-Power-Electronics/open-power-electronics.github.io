import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow: string
  title: string
  lede?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <header
      data-reveal
      className={cn(
        "flex max-w-[760px] flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading text-balance text-[36px] sm:text-[44px] lg:text-[56px]">{title}</h2>
      {lede !== undefined && <p className="lede max-w-[620px] text-pretty">{lede}</p>}
    </header>
  )
}

export function Chip({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "green"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11.5px] leading-none whitespace-nowrap",
        tone === "neutral" && "border-line bg-white text-body",
        tone === "green" && "border-green/20 bg-mint text-green",
        className,
      )}
    >
      {children}
    </span>
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
