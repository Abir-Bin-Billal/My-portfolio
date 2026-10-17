import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { education, profile } from '../../data/portfolio'
import { useCountUp } from '../../hooks/useTypewriter'
import Reveal, { RevealStagger, staggerItem } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import { FiAward, FiBriefcase, FiGlobe, FiLayers } from '../Icons'

const pillars = [
  {
    icon: FiLayers,
    title: 'Clean Architecture',
    text: 'Modular, testable structures that stay maintainable long after launch.',
  },
  {
    icon: FiBriefcase,
    title: 'Production Mindset',
    text: 'Shipped and maintained real apps — not just prototypes and demos.',
  },
  {
    icon: FiGlobe,
    title: 'Design Meets Code',
    text: 'Pixel-perfect responsive layouts paired with smooth, meaningful motion.',
  },
  {
    icon: FiAward,
    title: 'Relentless Learning',
    text: 'From Rive animations to agentic AI tooling and MCP integrations.',
  },
]

const counters = [
  { value: 3, suffix: '+', label: 'Years building apps' },
  { value: 5, suffix: '+', label: 'Projects delivered' },
  { value: 6, suffix: '', label: 'State management libs' },
  { value: 100, suffix: '%', label: 'Remote collaboration' },
]

const KEYWORDS = [
  'Flutter and Dart',
  'Swift and SwiftUI',
  'clean architecture',
  'performance',
  'scalability',
  'agentic AI tooling',
  'MCPs',
]

function highlightKeywords(text) {
  const pattern = new RegExp(`(${KEYWORDS.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(pattern).map((chunk, index) =>
    KEYWORDS.includes(chunk) ? (
      <span key={index} className="font-medium text-slate-100">
        {chunk}
      </span>
    ) : (
      chunk
    ),
  )
}

export default function About() {
  const countersRef = useRef(null)
  const inView = useInView(countersRef, { once: true, amount: 0.4 })

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="About me"
          title="Building apps people actually"
          highlight="enjoy using"
          description={profile.shortBio}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-6">
            {profile.bio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <p className="text-[15px] leading-[1.85] text-slate-400">{highlightKeywords(paragraph)}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="glass-card mt-8 grid gap-6 p-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300/80">
                    Spoken languages
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {profile.spokenLanguages.map((lang) => (
                      <li key={lang.name} className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-slate-200">{lang.name}</span>
                        <span className="font-mono text-[11px] text-slate-500">{lang.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-300/80">Education</p>
                  <p className="mt-3 text-sm font-medium text-slate-200">{education[0].degree}</p>
                  <p className="mt-1 text-[13px] text-slate-500">{education[0].school}</p>
                  <p className="mt-1 font-mono text-[11px] text-brand-300/70">{education[0].period}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <RevealStagger className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <motion.div key={pillar.title} variants={staggerItem}>
                <TiltCard className="h-full rounded-2xl">
                  <div className="glass-card h-full p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-400/25 bg-brand-400/10">
                      <pillar.icon className="h-5 w-5 text-brand-300" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{pillar.text}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </RevealStagger>
        </div>

        <div
          ref={countersRef}
          className="mt-20 grid grid-cols-2 gap-6 border-y border-white/[0.07] py-10 sm:grid-cols-4"
        >
          {counters.map((counter, index) => (
            <Counter key={counter.label} {...counter} start={inView} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ value, suffix, label, start, delay }) {
  const animated = useCountUp(value, { start, duration: 1400 + delay * 400 })
  return (
    <div className="text-center sm:text-left">
      <p className="font-display text-4xl font-extrabold tracking-tight text-gradient sm:text-5xl">
        {Math.round(animated)}
        {suffix}
      </p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
    </div>
  )
}
