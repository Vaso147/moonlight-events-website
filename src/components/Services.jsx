import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG } from '../config.js'

function Card({ item, img, pos = 'center', ratio = 'aspect-[4/3]', className = '' }) {
  return (
    <article className={`group flex flex-col ${className}`}>
      <div className={`${ratio} overflow-hidden rounded-3xl bg-sand`}>
        <img
          src={img}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ objectPosition: pos }}
        />
      </div>
      <h3 className="mt-5 font-display text-3xl font-medium leading-tight">{item.title}</h3>
      <p className="mt-2 max-w-md leading-relaxed text-plum/75">{item.desc}</p>
    </article>
  )
}

export default function Services() {
  const { t } = useLang()
  const s = t.services.items
  return (
    <section id="services" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-medium sm:text-5xl">{t.services.title}</h2>
          <p className="mt-4 text-lg text-plum/75">{t.services.intro}</p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-12">
          <Card item={s.wedding} img={IMG.wedding} pos="50% 62%" ratio="aspect-[4/3] md:aspect-[16/11]" className="md:col-span-7" />
          <Card item={s.birthday} img={IMG.birthday} pos="40% 50%" ratio="aspect-[4/3] md:aspect-[5/5]" className="md:col-span-5 md:mt-16" />

          <Card item={s.online} img={IMG.terrace} pos="50% 55%" ratio="aspect-[4/5]" className="md:col-span-4" />
          <Card item={s.balloons} img={IMG.balloons} pos="40% 45%" ratio="aspect-[4/5]" className="md:col-span-4 md:mt-10" />
          <Card item={s.bouquets} img={IMG.bouquet} pos="50% 50%" ratio="aspect-[4/5]" className="md:col-span-4 md:mt-20" />

          <article className="grid items-center gap-8 rounded-[2rem] bg-blush/60 p-6 md:col-span-12 md:grid-cols-2 md:p-10">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <img src={IMG.partyArch} alt="" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: '50% 30%' }} />
            </div>
            <div>
              <h3 className="font-display text-3xl font-medium leading-tight sm:text-4xl">{s.animation.title}</h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-plum/80">{s.animation.desc}</p>
              <a href="#contact" className="mt-6 inline-block rounded-full border border-plum/30 px-6 py-3 text-[15px] transition-colors hover:border-rose hover:text-rose">
                {t.services.ask}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
