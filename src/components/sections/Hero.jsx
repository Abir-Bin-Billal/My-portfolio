import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { heroRoles, marqueeTech, profile, stats } from '../../data/portfolio'
import { useSmoothScroll } from '../../hooks/usePortfolio'
import { useTypewriter } from '../../hooks/useTypewriter'
import { FiArrowDown, FiArrowUpRight, FiDownload, FiMapPin } from '../Icons'
import Magnetic from '../ui/Magnetic'
import Marquee from '../ui/Marquee'
import { TechIcon } from '../Icons'

export default function Hero() {
  const ref = useRef(null)
  const scrollTo = useSmoothScroll()
  const typed = useTypewriter(heroRoles)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 110])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen flex-col justify-center pt-28 pb-10">
      <motion.div style={{ y, opacity }} className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                {profile.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <FiMapPin className="h-3.5 w-3.5 text-brand-400/70" />
                {profile.location}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.2rem]"
            >
              Hi, I&apos;m{' '}
              <span className="relative inline-block">
                <span className="text-gradient">{profile.firstName}</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-brand-400/50"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 9C40 3 80 2 120 6C150 9 175 6 198 3"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 1, ease: 'easeInOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-7 flex min-h-[34px] items-center gap-3"
            >
              <span className="font-mono text-sm text-brand-400/80 sm:text-base">const role =&nbsp;</span>
              <span className="font-mono text-lg font-semibold text-white sm:text-2xl">{typed}</span>
              <span className="inline-block h-5 w-[2px] animate-caret bg-brand-300 sm:h-7" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52 }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Magnetic strength={0.22}>
                <button type="button" onClick={() => scrollTo('projects')} className="btn-primary group">
                  View my work
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a href={profile.resume} download={profile.resumeFileName} className="btn-ghost group">
                  <FiDownload className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download CV
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-slate-300 transition-colors hover:text-brand-300"
              >
                Let&apos;s talk
                <span className="h-px w-6 bg-slate-500 transition-all duration-300 group-hover:w-9 group-hover:bg-brand-400" />
              </button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-7 border-t border-white/[0.07] pt-8 sm:grid-cols-3"
            >
              {stats.map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{item.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-500">{item.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
          >
            <PortraitCard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-col gap-5 border-t border-white/[0.07] pt-8 sm:mt-20"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">Daily toolkit</span>
            <span className="hidden items-center gap-2 font-mono text-[11px] text-slate-600 sm:flex">
              <FiArrowDown className="h-3.5 w-3.5 animate-bounce" />
              scroll to explore
            </span>
          </div>
          <Marquee items={marqueeTech} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function PortraitCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_60%_30%,rgba(56,189,248,0.22),transparent_65%)] blur-2xl" />

      <div className="relative animate-float-slow">
        <div className="relative mx-auto w-full max-w-[380px] rounded-[2.4rem] border border-white/12 bg-ink-900/80 p-2.5 shadow-[0_40px_90px_-40px_rgba(2,6,23,1)] backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[1.9rem] border border-white/[0.07] bg-gradient-to-b from-ink-800 to-ink-950">
            <img
              src="/me.webp"
              alt={`${profile.name} — ${profile.role}`}
              className="aspect-[5/6] h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/5 to-transparent" />

            <div className="absolute inset-x-4 bottom-4">
              <p className="font-display text-lg font-bold tracking-tight text-white">{profile.name}</p>
              <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-200/80">
                {profile.role}
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="absolute -left-6 top-24 hidden animate-float rounded-2xl border border-white/12 bg-ink-900/85 px-3.5 py-3 backdrop-blur-xl [animation-delay:-2s] sm:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/15">
              <TechIcon name="flutter" className="h-4 w-4 text-brand-300" />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white">Flutter</p>
              <p className="font-mono text-[9px] text-slate-500">60 FPS UI</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          className="absolute -right-4 bottom-20 hidden animate-float rounded-2xl border border-white/12 bg-ink-900/85 px-3.5 py-3 backdrop-blur-xl [animation-delay:-4s] sm:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-glow/18">
              <TechIcon name="swift" className="h-4 w-4 text-violet-glow" />
            </span>
            <div>
              <p className="text-[11px] font-semibold text-white">SwiftUI</p>
              <p className="font-mono text-[9px] text-slate-500">Native iOS</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
