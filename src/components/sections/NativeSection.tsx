import { useI18n } from "@/i18n/I18nContext.tsx"

export function NativeSection() {
  const { t } = useI18n()
  return (
    <section id="native" data-nav="privacy" className="reveal scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-pe-headline md:text-5xl">
          {t.native.title}
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {t.native.items.map((item) => (
            <li key={item} className="pe-card bg-white px-5 py-5 text-base leading-relaxed text-pe-headline-2">
              <span aria-hidden="true" className="mr-3 inline-block size-1.5 rounded-full bg-pe-green" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
