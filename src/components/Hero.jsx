import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG } from '../config.js'

export default function Hero() {
  const { t, lang } = useLang()
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blush/50 to-ivory pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-12 md:gap-6 md:px-8 md:pb-24 md:pt-16">
        <div className="order-2 md:order-1 md:col-span-6 lg:col-span-6">
          <p className="mb-5 font-display text-xl italic text-rose">Moonlight Events</p>
          <h1 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            {t.hero.slogan}
          </h1>
          {lang === 'sq' && (
            <p className="mt-3 font-display text-xl italic text-plum/60">{t.hero.sloganEn}</p>
          )}
          <p className="mt-7 max-w-md text-lg leading-relaxed text-plum/80">{t.hero.desc}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="rounded-full bg-plum px-7 py-3.5 text-[15px] text-ivory transition-colors hover:bg-rose">
              {t.hero.cta1}
            </a>
            <a href="#contact" className="rounded-full border border-plum/30 px-7 py-3.5 text-[15px] transition-colors hover:border-rose hover:text-rose">
              {t.hero.cta2}
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-6">
          <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[420px] md:ml-auto md:max-w-[460px]">
            <motion.figure
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="arch aspect-[3/4] overflow-hidden bg-champagne shadow-soft"
            >
              <img
                src={IMG.wedding}
                alt={t.hero.caption}
                width="1200"
                height="1600"
                fetchpriority="high"
                className="h-full w-full object-cover"
              />
            </motion.figure>
            <img
              src={IMG.birthday}
              alt=""
              width="1600"
              height="1521"
              loading="eager"
              className="absolute -bottom-6 -left-6 hidden h-40 w-40 rounded-2xl border-4 border-ivory object-cover shadow-soft sm:block md:-left-14 md:h-48 md:w-48"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
