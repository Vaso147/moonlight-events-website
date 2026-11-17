import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG } from '../config.js'

export default function About() {
  const { t } = useLang()
  const values = [
    [t.about.v1, t.about.v1d],
    [t.about.v2, t.about.v2d],
    [t.about.v3, t.about.v3d],
  ]
  return (
    <section id="about" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="mx-auto aspect-square max-w-sm overflow-hidden rounded-[2rem] bg-[#141418] shadow-soft">
            <img src={IMG.logo} alt="Moonlight Decor and Gifts" width="1024" height="1024" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <h2 className="font-display text-4xl font-medium sm:text-5xl">{t.about.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum/85">{t.about.p1}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-plum/85">{t.about.p2}</p>
          <dl className="mt-10 max-w-xl divide-y divide-plum/15 border-y border-plum/15">
            {values.map(([k, d]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-display text-2xl">{k}</dt>
                <dd className="text-plum/75">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
