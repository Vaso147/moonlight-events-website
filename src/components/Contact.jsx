import { Instagram } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from '../config.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="bg-blush/60 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <h2 className="font-display text-4xl font-medium sm:text-5xl">{t.contact.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-plum/80">{t.contact.msg}</p>

        <div className="mt-12 grid gap-5 text-left md:grid-cols-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 rounded-3xl bg-ivory p-6 shadow-soft transition-transform hover:-translate-y-1">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
              <WhatsAppIcon size={28} />
            </span>
            <span>
              <span className="block font-display text-2xl">{t.contact.wa}</span>
              <span className="block text-plum/70">{WHATSAPP_NUMBER}</span>
              <span className="block text-sm text-plum/60">{t.contact.waSub}</span>
            </span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 rounded-3xl bg-ivory p-6 shadow-soft transition-transform hover:-translate-y-1">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lilac text-plum">
              <Instagram size={26} />
            </span>
            <span>
              <span className="block font-display text-2xl">{t.contact.ig}</span>
              <span className="block text-plum/70">{INSTAGRAM_HANDLE}</span>
              <span className="block text-sm text-plum/60">{t.contact.igSub}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
