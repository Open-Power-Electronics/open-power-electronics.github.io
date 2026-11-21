import type { ReactNode } from "react"
import { cn } from "@/lib/utils.ts"
import type { ChapterId, NavId } from "@/content/site.ts"

export function SectionSplit(props: {
  id: string
  chapter?: ChapterId
  nav?: NavId
  title: string
  intro: ReactNode
  media: ReactNode
  featured: boolean
}) {
  return (
    <section
      id={props.id}
      data-chapter={props.chapter}
      data-nav={props.nav}
      className={cn(
        "reveal scroll-mt-24 px-5 py-16 md:px-8 md:py-24",
        props.featured && "bg-pe-mint-a",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-3 lg:gap-12",
          props.featured && "max-w-7xl",
        )}
      >
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-pe-headline md:text-5xl">
            {props.title}
          </h2>
          {props.intro}
        </div>
        <div className="lg:col-span-2">{props.media}</div>
      </div>
    </section>
  )
}
