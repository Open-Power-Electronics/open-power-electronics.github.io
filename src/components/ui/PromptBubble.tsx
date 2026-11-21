import { Check } from "lucide-react"
import { Typewriter } from "@/components/ui/Typewriter.tsx"

export function PromptBubble(props: { label: string; text: string }) {
  return (
    <div className="rounded-[20px] border border-pe-border bg-white p-4 shadow-[0_8px_28px_rgba(31,38,34,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-pe-green">{props.label}</span>
        <Check className="size-4 text-pe-green" aria-hidden="true" />
      </div>
      <Typewriter
        text={props.text}
        className="mt-2 text-base font-semibold leading-snug text-pe-headline"
      />
    </div>
  )
}
