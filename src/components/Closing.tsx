import { closingCopy } from "@/i18n/content.ts"

export function Closing() {
  const { line1, power, between, engineer } = closingCopy

  return (
    <section className="closing-banner border-t border-line">
      <div className="container-page closing-copy relative flex flex-col items-center text-center">
        <h2 lang="en" data-reveal className="display closing-title">
          <span className="mb-[0.26em] block text-[0.68em] font-semibold text-ink-2">{line1}</span>{" "}
          <span className="block">
            <strong className="font-extrabold text-green">{power}</strong>
            <span className="text-[0.88em] font-bold text-ink-2">{between}</span>
            <strong className="font-extrabold text-green">{engineer}</strong>
          </span>
        </h2>
      </div>
    </section>
  )
}
