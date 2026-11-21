import type { LucideIcon } from "lucide-react"

export function PluginCard(props: { icon: LucideIcon; name: string; detail: string }) {
  const Icon = props.icon
  return (
    <article className="flex items-center gap-4 rounded-[20px] border border-pe-border bg-white px-5 py-4">
      <Icon className="size-7 shrink-0 text-pe-headline" aria-hidden="true" />
      <div>
        <h3 className="text-base font-bold text-pe-headline">{props.name}</h3>
        <p className="mt-1 text-sm leading-snug text-pe-body">{props.detail}</p>
      </div>
    </article>
  )
}

export function YourPluginCard(props: { label: string }) {
  return (
    <article className="grid min-h-[88px] place-items-center rounded-[20px] border border-dashed border-pe-green/50 bg-pe-mint-a px-5 py-4 text-base font-semibold text-pe-green">
      {props.label}
    </article>
  )
}
