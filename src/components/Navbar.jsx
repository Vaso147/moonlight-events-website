import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG } from '../config.js'

const LINKS = [
  ['home', '#home'],
  ['services', '#services'],
  ['gallery', '#gallery'],
  ['about', '#about'],
  ['contact', '#contact'],
]

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t.nav.lang} className="inline-flex rounded-full border border-plum/20 p-0.5 text-sm">
      {['sq', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 tracking-wide transition-colors ${
            lang === l ? 'bg-plum text-ivory' : 'text-plum/70 hover:text-plum'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 bg-ivory/95 transition-shadow ${scrolled ? 'shadow-[0_1px_0_rgba(75,58,63,0.1)]' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#home" className="flex items-center gap-2 sm:gap-3">
          <img src={IMG.logoMark} alt="" width="40" height="40" className="h-10 w-10 rounded-full object-cover" />
          <span className="whitespace-nowrap font-display text-xl font-medium leading-none sm:text-2xl">Moonlight Events</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map(([k, href]) => (
            <li key={k}>
              <a href={href} className="text-[15px] text-plum/80 transition-colors hover:text-rose">
                {t.nav[k]}
              </a>
            </li>
          ))}
          <li><LanguageSwitcher /></li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="grid h-10 w-10 place-items-center rounded-full border border-plum/20"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-plum/10 bg-ivory md:hidden"
          >
            <ul className="flex flex-col px-5 py-3">
              {LINKS.map(([k, href]) => (
                <li key={k}>
                  <a href={href} onClick={() => setOpen(false)} className="block border-b border-plum/10 py-3 font-display text-2xl last:border-0">
                    {t.nav[k]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
