import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG } from '../config.js'

const PHOTOS = [
  { key: 'wedding', src: IMG.wedding, w: 1200, h: 1600 },
  { key: 'birthday', src: IMG.birthday, w: 1600, h: 1521 },
  { key: 'table', src: IMG.table, w: 1066, h: 1600 },
  { key: 'terrace', src: IMG.terrace, w: 1200, h: 1600 },
  { key: 'balloons', src: IMG.balloons, w: 1200, h: 1600 },
]

function Lightbox({ index, onClose, onStep, t }) {
  const closeRef = useRef(null)
  const photo = PHOTOS[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onStep])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-plum/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.title}
      onClick={onClose}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ivory text-plum">
        <X size={20} />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onStep(-1) }} aria-label={t.gallery.prev} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory text-plum">
        <ChevronLeft size={22} />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onStep(1) }} aria-label={t.gallery.next} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ivory text-plum">
        <ChevronRight size={22} />
      </button>
      <img
        src={photo.src}
        alt={t.gallery.alts[photo.key]}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[calc(100vw-7rem)] rounded-2xl object-contain shadow-soft"
      />
    </motion.div>
  )
}

export default function Gallery() {
  const { t } = useLang()
  const [active, setActive] = useState(null)
  const triggerRefs = useRef([])

  const close = useCallback(() => {
    setActive((i) => {
      if (i !== null) setTimeout(() => triggerRefs.current[i]?.focus(), 0)
      return null
    })
  }, [])
  const step = useCallback((d) => setActive((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length)), [])

  return (
    <section id="gallery" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-medium sm:text-5xl">{t.gallery.title}</h2>
          <p className="max-w-sm text-plum/75">{t.gallery.intro}</p>
        </div>

        <ul className="mt-12 columns-2 gap-4 md:columns-3 md:gap-6">
          {PHOTOS.map((p, i) => (
            <li key={p.key} className="mb-4 break-inside-avoid md:mb-6">
              <button
                ref={(el) => (triggerRefs.current[i] = el)}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t.gallery.open}: ${t.gallery.alts[p.key]}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-champagne/60 shadow-soft"
              >
                <img
                  src={p.src}
                  alt={t.gallery.alts[p.key]}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-plum/0 transition-colors duration-500 group-hover:bg-plum/10" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active !== null && <Lightbox index={active} onClose={close} onStep={step} t={t} />}
      </AnimatePresence>
    </section>
  )
}
