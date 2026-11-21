import { cn } from "@/lib/utils.ts"

export function SelectionBox(props: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-2xl border-2 border-pe-selection bg-pe-selection/15", props.className)}
    />
  )
}
