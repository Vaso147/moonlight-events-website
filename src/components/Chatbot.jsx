import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircleQuestion, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { WHATSAPP_URL } from '../config.js'

export default function Chatbot() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [asked, setAsked] = useState([]) // indexes, so language switch re-translates history
  const scrollRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [asked, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = (next) => {
    setOpen(next)
    if (!next) setTimeout(() => btnRef.current?.focus(), 0)
  }

  const remaining = t.chat.qa.map((qa, i) => ({ ...qa, i })).filter((x) => !asked.includes(x.i))

  return (
    <div className="fixed bottom-5 left-5 z-50 md:bottom-7 md:left-7">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={t.chat.title}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-3 flex max-h-[min(34rem,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-ivory shadow-[0_24px_60px_-20px_rgba(75,58,63,0.5)] ring-1 ring-plum/10"
          >
            <header className="flex items-start justify-between bg-blush px-5 py-4">
              <div>
                <h2 className="font-display text-2xl leading-none">{t.chat.title}</h2>
                <p className="mt-1 text-xs text-plum/70">{t.chat.sub}</p>
              </div>
              <button type="button" onClick={() => toggle(false)} aria-label={t.chat.close} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ivory/60">
                <X size={18} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sand px-4 py-2.5 text-[15px] leading-relaxed">{t.chat.welcome}</p>
              {asked.map((i) => (
                <div key={i} className="space-y-3">
                  <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-plum px-4 py-2.5 text-[15px] text-ivory">{t.chat.qa[i].q}</p>
                  <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sand px-4 py-2.5 text-[15px] leading-relaxed">{t.chat.qa[i].a}</p>
                </div>
              ))}
              {asked.length > 0 && (
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-[#25D366] px-4 py-2 text-sm text-white">
                  {t.chat.cta}
                </a>
              )}
            </div>

            {remaining.length > 0 && (
              <div className="border-t border-plum/10 px-4 py-3">
                <p className="mb-2 text-xs text-plum/60">{asked.length ? t.chat.more : t.chat.pick}</p>
                <div className="flex flex-wrap gap-2">
                  {remaining.map((x) => (
                    <button
                      key={x.i}
                      type="button"
                      onClick={() => setAsked((a) => [...a, x.i])}
                      className="rounded-full border border-rose/50 px-3 py-1.5 text-left text-sm transition-colors hover:bg-blush"
                    >
                      {x.q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={btnRef}
        type="button"
        onClick={() => toggle(!open)}
        aria-expanded={open}
        aria-label={open ? t.chat.close : t.chat.open}
        className="grid h-14 w-14 place-items-center rounded-full bg-plum text-ivory shadow-soft transition-transform hover:scale-105 md:h-16 md:w-16"
      >
        {open ? <X size={26} /> : <MessageCircleQuestion size={28} />}
      </button>
    </div>
  )
}
