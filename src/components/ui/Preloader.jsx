import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const duration = 1500

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round(t * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 260)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-950"
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.13),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center gap-6"
      >
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-brand-400/50" />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-2xl font-bold text-gradient backdrop-blur-xl">
            AB
          </div>
        </div>

        <div className="text-center">
          <p className="font-display text-lg font-semibold tracking-tight text-white">{profile.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-brand-200/70">
            {profile.role}
          </p>
        </div>

        <div className="mt-2 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-violet-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-slate-500">{progress}%</span>
      </motion.div>
    </motion.div>
  )
}
