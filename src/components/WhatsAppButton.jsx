import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext.jsx'
import { WHATSAPP_URL } from '../config.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function WhatsAppButton() {
  const { t } = useLang()
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.wa.label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] md:bottom-7 md:right-7 md:h-16 md:w-16"
    >
      <WhatsAppIcon size={30} />
    </motion.a>
  )
}
