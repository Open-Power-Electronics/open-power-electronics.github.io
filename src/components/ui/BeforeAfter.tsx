export function BeforeAfter(props: {
  badge: string
  beforeLabel: string
  afterLabel: string
  from: string
  to: string
  unit: string
  caption: string
}) {
  const fromValue = Number(props.from)
  const toValue = Number(props.to)
  if (!Number.isFinite(fromValue) || !Number.isFinite(toValue) || fromValue <= 0 || toValue < 0) {
    throw new Error(`invalid before/after values: ${props.from} -> ${props.to}`)
  }
  const ratio = (toValue / fromValue) * 100
  return (
    <div className="mt-8 max-w-sm">
      <p className="text-3xl font-extrabold leading-none tracking-tight text-pe-green md:text-4xl">{props.badge}</p>
      <div className="mt-4 flex justify-between text-xs font-semibold uppercase tracking-wide text-pe-nav">
        <span>{props.beforeLabel}</span>
        <span>{props.afterLabel}</span>
      </div>
      <div className="relative mt-2 h-1.5 rounded-full bg-[#E7E2DC]">
        <div className="relative h-full rounded-full bg-pe-stat" style={{ width: `${ratio}%` }}>
          <span className="absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rounded-full border-2 border-pe-stat bg-white" />
        </div>
      </div>
      <p className="mt-3 text-sm text-pe-headline-2">
        {props.from} → {props.to} {props.unit}
      </p>
      <p className="text-sm text-pe-nav">{props.caption}</p>
    </div>
  )
}
