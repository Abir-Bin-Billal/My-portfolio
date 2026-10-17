import { navLinks, profile } from '../../data/portfolio'
import { useSmoothScroll } from '../../hooks/usePortfolio'
import { TechIcon, FiArrowUpRight, FiHeart } from '../Icons'
import Magnetic from '../ui/Magnetic'

export default function Footer() {
  const scrollTo = useSmoothScroll()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.07] pt-16 pb-8">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-display text-sm font-bold text-gradient">
                AB
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{profile.name}</p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
                  {profile.role}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-slate-500">
              {profile.focus}. Based in {profile.location} · {profile.availability}.
            </p>
            <div className="mt-6 flex gap-2.5">
              {profile.socials
                .filter((social) => social.label !== 'Resume')
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/45 hover:text-brand-300"
                  >
                    <TechIcon name={social.icon} className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="group flex items-center gap-2 text-[13.5px] text-slate-400 transition-colors duration-300 hover:text-brand-300"
                  >
                    <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Get in touch</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-slate-400 transition-colors duration-300 hover:text-brand-300"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="text-slate-400 transition-colors duration-300 hover:text-brand-300"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="text-slate-500">{profile.location}</li>
            </ul>

            <a
              href={profile.resume}
              download={profile.resumeFileName}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12.5px] font-medium text-slate-300 transition-all duration-300 hover:border-brand-400/45 hover:text-white"
            >
              Download CV
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="font-mono text-[11px] text-slate-600">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
            Built with <FiHeart className="h-3 w-3 text-brand-400/80" /> React, Tailwind &amp; Framer Motion
          </p>
          <Magnetic strength={0.25} className="hidden sm:block">
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/45 hover:text-brand-300"
              aria-label="Back to top"
            >
              <FiArrowUpRight className="h-4 w-4 -rotate-45" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
