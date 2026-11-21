import { useI18n } from "@/i18n/I18nContext.tsx"
import { Film } from "@/components/media/Film.tsx"
import { SectionSplit } from "@/components/layout/SectionSplit.tsx"

export function FilmSection() {
  const { t } = useI18n()
  return (
    <SectionSplit
      id="film"
      chapter="overall"
      featured={false}
      title={t.film.title}
      intro={null}
      media={
        <Film
          label={t.film.label}
          playLabel={t.film.play}
          chapterLabel={(id) => t.chapters[id]}
        />
      }
    />
  )
}
