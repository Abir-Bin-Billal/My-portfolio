import { motion } from 'framer-motion'
import { services } from '../../data/portfolio'
import { TechIcon, FiArrowUpRight } from '../Icons'
import { useSmoothScroll } from '../../hooks/usePortfolio'
import { RevealStagger, staggerItem } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'

export default function Services() {
  const scrollTo = useSmoothScroll()

  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Services"
          title="How I can help your"
          highlight="next product"
          align="center"
          description="Whether it's a brand-new app or an existing codebase that needs structure and speed — here's what I bring to the table."
        />

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {services.map((service) => (
            <motion.div key={service.title} variants={staggerItem} className="h-full">
              <TiltCard className="h-full rounded-3xl" intensity={7}>
                <div className="glass-card group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-brand-400/40">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/12 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" />

                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/22 to-violet-glow/14">
                    <TechIcon name={service.icon} className="h-5 w-5 text-brand-200" />
                    <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                  </span>

                  <h3 className="relative mt-5 font-display text-base font-bold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-slate-400">
                    {service.description}
                  </p>

                  <ul className="relative mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-[12.5px] text-slate-500">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-brand-400/70" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => scrollTo('contact')}
                    className="relative mt-auto flex items-center gap-1.5 pt-6 text-[12.5px] font-semibold text-slate-500 transition-colors duration-300 hover:text-brand-300"
                  >
                    Start a project
                    <FiArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
