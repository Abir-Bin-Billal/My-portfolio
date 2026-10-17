import { motion } from 'framer-motion'
import { devProcess, education, experience } from '../../data/portfolio'
import { FiAward, FiBriefcase, FiCheckCircle } from '../Icons'
import Reveal, { RevealStagger, staggerItem } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'

export default function Experience() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="Where I've been"
          highlight="shipping software"
          description="Hands-on work across Flutter and native iOS — from architecture decisions to the final pixel."
        />

        <div className="mt-14 space-y-6">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 0.1}>
              <div className="relative">
                <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-brand-400/50 via-violet-glow/25 to-transparent sm:block" />

                <div className="glass-card relative overflow-hidden p-6 transition-colors duration-500 hover:border-brand-400/35 sm:ml-10 sm:p-8">
                  <span className="absolute left-[-2.05rem] top-8 hidden h-3.5 w-3.5 rounded-full border-2 border-ink-950 bg-brand-400 sm:block">
                    {job.current && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/70" />
                    )}
                  </span>

                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                          {job.role}
                        </h3>
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
                            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-slate-400">
                        <span className="font-medium text-brand-300">{job.company}</span>
                        <span className="mx-2 text-slate-600">·</span>
                        {job.type}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-slate-400">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-slate-400">{job.summary}</p>

                  <ul className="mt-6 space-y-3">
                    {job.highlights.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                        className="flex gap-3 text-[14px] leading-relaxed text-slate-400"
                      >
                        <FiCheckCircle className="mt-[3px] h-4 w-4 shrink-0 text-brand-400/80" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 font-mono text-[11px] text-slate-400 transition-colors duration-300 hover:border-brand-400/40 hover:text-brand-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {education.map((item) => (
            <Reveal key={item.school}>
              <div className="relative">
                <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-violet-glow/50 to-transparent sm:block" />
                <div className="glass-card relative overflow-hidden p-6 transition-colors duration-500 hover:border-violet-glow/35 sm:ml-10 sm:p-8">
                  <span className="absolute left-[-2.05rem] top-8 hidden h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-ink-950 bg-violet-glow sm:flex" />

                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <FiAward className="h-4 w-4 text-violet-glow" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-glow/80">
                          Education
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-white">
                        {item.degree}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-400">{item.school}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-slate-400">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-slate-500">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <FiBriefcase className="h-4 w-4 text-brand-300" />
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight text-white">How I work</h3>
            </div>
          </Reveal>

          <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {devProcess.map((phase) => (
              <motion.div key={phase.step} variants={staggerItem}>
                <TiltCard className="h-full rounded-2xl" intensity={7}>
                  <div className="glass-card h-full p-5">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-brand-400/70">{phase.step}</span>
                    <h4 className="mt-3 text-base font-semibold text-white">{phase.title}</h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{phase.text}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  )
}
