import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { content, type Content, type Lang } from "./content.ts"

type I18nValue = {
  lang: Lang
  toggle: () => void
  t: Content
}

const STORAGE_KEY = "openpe-lang"

const I18nContext = createContext<I18nValue | null>(null)

function readStoredLang(): Lang {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === null) return "en"
  if (stored === "en" || stored === "zh") return stored
  throw new Error(`Unsupported ${STORAGE_KEY} value: ${stored}`)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Prerendered HTML is English. The first client render must match it, so a
  // stored choice is applied after mount. Never read navigator.language.
  const [lang, setLangState] = useState<Lang>("en")

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "zh" : "en"
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  useEffect(() => {
    const stored = readStoredLang()
    setLangState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang
    document.title = content[lang].meta.title
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({ lang, toggle, t: content[lang] }),
    [lang, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (ctx === null) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
