import { Typewriter } from "@/components/ui/Typewriter.tsx"

export function UserComment(props: { label: string; add: string; text: string }) {
  return (
    <div className="rounded-[20px] border border-pe-border bg-white p-4 shadow-[0_8px_28px_rgba(31,38,34,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-pe-green">{props.label}</span>
        <span className="rounded-full bg-pe-green px-3 py-1 text-xs font-semibold text-white">{props.add}</span>
      </div>
      <Typewriter
        text={props.text}
        className="mt-2 text-base font-semibold leading-snug text-pe-headline"
      />
    </div>
  )
}
