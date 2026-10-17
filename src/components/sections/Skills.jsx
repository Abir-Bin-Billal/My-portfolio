import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'
import { TechIcon } from '../Icons'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = skillGroups[activeIndex]

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Skills & stack"
          title="The toolkit behind every"
          highlight="shipped app"
          description="From Dart and Swift to Bloc, Riverpod, Firebase and Docker — the tools I reach for when turning an idea into a production-grade application."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          <div className="flex flex-col gap-2">
            {skillGroups.map((group, index) => {
              const isActive = index === activeIndex
              return (
                <Reveal key={group.title} direction="right" delay={index * 0.06}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-brand-400/40 bg-brand-400/[0.08] shadow-glow'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                          isActive ? 'border-brand-400/40 bg-brand-400/15' : 'border-white/10 bg-white/[0.04]'
                        }`}
                      >
                        <TechIcon
                          name={group.icon}
                          className={`h-4 w-4 transition-colors duration-300 ${
                            isActive ? 'text-brand-300' : 'text-slate-500 group-hover:text-slate-300'
                          }`}
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[13.5px] font-semibold transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {group.title}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {group.skills.length} items
                        </span>
                      </span>
                    </div>
                    {isActive && (
                      <motion.span
                        layoutId="skill-active-bar"
                        className={`absolute inset-y-1 left-0 w-[3px] rounded-full bg-gradient-to-b ${group.accent}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                </Reveal>
              )
            })}
          </div>

          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card relative overflow-hidden p-6 sm:p-8"
              >
                <div
                  className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${active.accent} opacity-[0.14] blur-3xl`}
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {active.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {active.skills.length} technologies
                    </p>
                  </div>
                  <span className="relative hidden h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 sm:flex">
                    <span className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-25`} />
                    <TechIcon name={active.icon} className="relative h-5 w-5 text-white" />
                  </span>
                </div>

                <div className="relative mt-8 flex flex-wrap gap-3">
                  {active.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.06 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="group/skill flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.028] py-2.5 pl-2.5 pr-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/45 hover:bg-brand-400/[0.08]"
                    >
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10">
                        <span
                          className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-25 transition-opacity duration-300 group-hover/skill:opacity-50`}
                        />
                        <TechIcon name={skill.icon} className="relative h-4 w-4 text-white" />
                      </span>
                      <span className="whitespace-nowrap text-[13px] font-medium text-slate-300 transition-colors duration-300 group-hover/skill:text-white">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
