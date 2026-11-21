const WIDTH = 320
const HEIGHT = 120
const TARGET = 12
const V_MIN = 11.8
const V_MAX = 12.4

function y(volts: number): number {
  return HEIGHT - ((volts - V_MIN) / (V_MAX - V_MIN)) * HEIGHT
}

function trace(level: (t: number) => number, ripple: number): string {
  const points: string[] = []
  for (let i = 0; i <= 160; i += 1) {
    const t = i / 160
    const volts = level(t) + ripple * Math.sin(t * 64)
    points.push(`${(t * WIDTH).toFixed(1)},${y(volts).toFixed(1)}`)
  }
  return points.join(" ")
}

const BASELINE = trace((t) => 12.25 + 0.12 * Math.exp(-t * 40), 0.018)
const TUNED = trace((t) => TARGET + 0.02 + 0.3 * Math.exp(-t * 30), 0.012)

export function TransientArt() {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT + 18}`} className="w-full" aria-hidden="true">
      <rect x="0" y={y(TARGET * 1.01)} width={WIDTH} height={y(TARGET * 0.99) - y(TARGET * 1.01)} fill="#EAF7EC" />
      <line x1="0" x2={WIDTH} y1={y(TARGET)} y2={y(TARGET)} stroke="#B9DCC2" strokeDasharray="3 4" />
      <polyline points={BASELINE} fill="none" stroke="#A36734" strokeWidth="1.5" strokeLinejoin="round" />
      <polyline points={TUNED} fill="none" stroke="#39784E" strokeWidth="2" strokeLinejoin="round" />
      <text x="0" y={HEIGHT + 15} className="fill-muted font-mono text-[10px]">
        0
      </text>
      <text x={WIDTH} y={HEIGHT + 15} textAnchor="end" className="fill-muted font-mono text-[10px]">
        10 ms
      </text>
      <text x={WIDTH} y={y(TARGET * 1.01) - 4} textAnchor="end" className="fill-green font-mono text-[10px]">
        ±1%
      </text>
    </svg>
  )
}

export function LoopArt() {
  return (
    <svg viewBox="0 0 320 138" className="w-full" aria-hidden="true">
      <rect x="54" y="22" width="212" height="86" rx="14" fill="#F1F7F0" stroke="#206F39" strokeOpacity="0.25" strokeDasharray="4 4" />
      <path d="M68 36 H252 V94 H68 Z" fill="none" stroke="#A83840" strokeWidth="5" strokeLinejoin="round" />
      <path d="M150 36 l8 -5 v10 z" fill="#A83840" />
      <rect x="44" y="52" width="48" height="26" rx="5" fill="#fff" stroke="#1F2622" strokeOpacity="0.15" />
      <text x="68" y="69" textAnchor="middle" className="fill-ink font-mono text-[11px] font-semibold">
        C
      </text>
      <rect x="228" y="52" width="48" height="26" rx="5" fill="#fff" stroke="#1F2622" strokeOpacity="0.15" />
      <text x="252" y="69" textAnchor="middle" className="fill-ink font-mono text-[11px] font-semibold">
        Q
      </text>
      <text x="160" y="130" textAnchor="middle" className="fill-muted font-mono text-[10px]">
        loop area
      </text>
    </svg>
  )
}
