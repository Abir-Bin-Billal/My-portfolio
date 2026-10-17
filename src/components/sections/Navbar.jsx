import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks, profile } from '../../data/portfolio'
import { useActiveSection, useSmoothScroll } from '../../hooks/usePortfolio'
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from '../Icons'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const scrollTo = useSmoothScroll()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollTo(id), open ? 260 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <button
            type="button"
            onClick={() => go('home')}
            className="group flex items-center gap-3"
            aria-label="Go to top"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-display text-[13px] font-bold text-gradient transition-transform duration-300 group-hover:scale-105">
              AB
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[13px] font-semibold tracking-tight text-white">{profile.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                {profile.role}
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1.5 backdrop-blur-xl lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-brand-400/30 bg-brand-400/12"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download={profile.resumeFileName}
              className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-slate-200 transition-all duration-300 hover:border-brand-400/50 hover:bg-brand-400/10 hover:text-white sm:inline-flex"
            >
              <FiDownload className="h-3.5 w-3.5" />
              Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-glow px-4 py-2 text-[13px] font-semibold text-white shadow-glow transition-shadow duration-300 hover:shadow-glow-violet md:inline-flex"
            >
              Hire me
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-x flex h-full flex-col justify-center gap-1 pt-16">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ delay: 0.05 + index * 0.055, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between border-b border-white/[0.07] py-4 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-brand-400/70">{link.index}</span>
                    <span className="font-display text-2xl font-semibold tracking-tight text-slate-200 transition-colors duration-300 group-hover:text-white">
                      {link.label}
                    </span>
                  </span>
                  <FiArrowUpRight className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href={`mailto:${profile.email}`} className="btn-primary flex-1">
                  Hire me
                </a>
                <a href={profile.resume} download={profile.resumeFileName} className="btn-ghost flex-1">
                  <FiDownload className="h-4 w-4" />
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
