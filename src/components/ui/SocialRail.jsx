import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { TechIcon } from '../Icons'

export default function SocialRail() {
  const socials = profile.socials.filter((social) => social.label !== 'Resume')

  return (
    <div className="pointer-events-none fixed bottom-0 left-6 z-40 hidden xl:flex xl:flex-col xl:items-center xl:gap-4">
      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="pointer-events-auto flex flex-col items-center gap-3"
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-ink-900/60 text-slate-500 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-brand-300"
          >
            <TechIcon name={social.icon} className="h-4 w-4" />
          </a>
        ))}
      </motion.ul>

      <motion.span
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 96, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="mt-2 w-px bg-gradient-to-b from-white/25 to-transparent"
      />
    </div>
  )
}
