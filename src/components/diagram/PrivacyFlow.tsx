import type { Content } from "@/i18n/content.ts"

export function PrivacyFlow(props: { copy: Content["privacy"] }) {
  return (
    <div className="pe-card p-5 md:p-6">
      <p className="text-sm font-semibold text-pe-nav">{props.copy.machine}</p>
      <ul className="mt-3 space-y-2">
        {props.copy.machineItems.map((item) => (
          <li key={item} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-pe-headline">
            {item}
          </li>
        ))}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-2">
        {props.copy.agents.map((agent) => (
          <li key={agent} className="rounded-full border border-pe-border bg-white px-3 py-1 text-sm text-pe-headline">
            {agent}
          </li>
        ))}
      </ul>
      <div className="my-5 flex items-center gap-3 text-sm font-semibold text-pe-green">
        <span className="h-px flex-1 bg-pe-green" />
        <span>{props.copy.onlyTo}</span>
        <span aria-hidden="true">→</span>
        <span className="h-px flex-1 bg-pe-green" />
      </div>
      <p className="rounded-2xl bg-pe-api px-4 py-3 text-center text-base font-semibold text-pe-headline">
        {props.copy.provider}
      </p>
    </div>
  )
}
