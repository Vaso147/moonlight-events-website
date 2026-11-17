import { Instagram } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from '../config.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

const LINKS = [['home', '#home'], ['services', '#services'], ['gallery', '#gallery'], ['about', '#about'], ['contact', '#contact']]

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-champagne/50 pb-24 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <img src={IMG.logoMark} alt="" width="44" height="44" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
            <span className="font-display text-3xl font-medium">Moonlight Events</span>
          </div>
          <p className="mt-4 font-display text-xl italic text-plum/80">Making every moment unforgettable.</p>
        </div>
        <nav className="md:col-span-3" aria-label={t.footer.nav}>
          <h2 className="font-display text-2xl">{t.footer.nav}</h2>
          <ul className="mt-3 space-y-2">
            {LINKS.map(([k, h]) => (
              <li key={k}><a href={h} className="text-plum/75 hover:text-rose">{t.nav[k]}</a></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="font-display text-2xl">{t.footer.follow}</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-plum/75 hover:text-rose">
                <Instagram size={18} /> {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-plum/75 hover:text-rose">
                <WhatsAppIcon size={18} /> {WHATSAPP_NUMBER}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-5 text-sm text-plum/60 md:px-8">
        © {new Date().getFullYear()} Moonlight Events. {t.footer.rights}
      </p>
    </footer>
  )
}
