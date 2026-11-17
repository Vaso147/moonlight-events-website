import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations.js'

const STORAGE_KEY = 'moonlight-lang'
const LanguageContext = createContext(null)

function readStoredLang() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'en' || v === 'sq' ? v : 'sq'
  } catch {
    return 'sq'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang)

  const setLang = useCallback((l) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    const t = translations[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
