export function BulletList({ items }: { items: readonly string[] }) {
  const seen = new Set<string>()
  for (const item of items) {
    if (item === "") throw new Error("bullet text is empty")
    if (seen.has(item)) throw new Error(`duplicate bullet: ${item}`)
    seen.add(item)
  }
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-pe-headline-2">
          <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-pe-green" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function FinePrint({ children }: { children: string }) {
  return <p className="mt-4 max-w-md text-sm leading-relaxed text-pe-nav">{children}</p>
}
