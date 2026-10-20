import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCheck, FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from '../Icons'

const panelTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

export default function ProjectModal({ project, onClose }) {
  const galleryRef = useRef(null)
  const closeRef = useRef(null)

  const hasGallery = Boolean(project.gallery?.length)
  const shots = project.gallery ?? []

  const scrollGallery = useCallback((direction) => {
    const el = galleryRef.current
    if (!el) return
    const first = el.querySelector('[data-shot]')
    const step = first ? first.getBoundingClientRect().width + 16 : el.clientWidth * 0.85
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') scrollGallery(1)
      else if (event.key === 'ArrowLeft') scrollGallery(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, scrollGallery])

  const links = [
    project.links?.live && { label: 'Live demo', href: project.links.live },
    project.links?.appStore && { label: 'App Store', href: project.links.appStore },
    project.links?.playStore && { label: 'Play Store', href: project.links.playStore },
    project.links?.github && { label: 'Source code', href: project.links.github },
  ].filter(Boolean)

  return (
    <div className="fixed inset-0 z-[80] flex items-stretch justify-center sm:items-center sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={panelTransition}
        className="relative z-10 flex h-full w-full max-w-4xl flex-col overflow-hidden border border-white/10 bg-ink-900/95 shadow-card backdrop-blur-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-3xl"
      >
        <header className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-white/[0.07] bg-ink-900/80 px-5 py-4 backdrop-blur-xl sm:px-7 sm:py-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-500">
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-brand-200/90">
                {project.category}
              </span>
              <span>{project.year}</span>
              {project.role && (
                <>
                  <span className="h-1 w-1 rounded-full bg-slate-600" />
                  <span>{project.role}</span>
                </>
              )}
            </div>
            <h3
              id="project-modal-title"
              className="mt-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors duration-300 hover:border-brand-400/50 hover:text-white"
          >
            <FiX className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {hasGallery && (
            <section className="relative border-b border-white/[0.07] px-5 py-6 sm:px-7">
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.07]`} />

              <div className="relative flex items-center justify-between gap-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">Screenshots</p>
                {shots.length > 1 && (
                  <div className="hidden gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => scrollGallery(-1)}
                      aria-label="Previous screenshot"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition-colors duration-300 hover:border-brand-400/50 hover:text-white"
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollGallery(1)}
                      aria-label="Next screenshot"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition-colors duration-300 hover:border-brand-400/50 hover:text-white"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div
                ref={galleryRef}
                className="relative mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {shots.map((shot, index) => (
                  <figure
                    key={shot.src}
                    data-shot
                    className="w-[168px] shrink-0 snap-center sm:w-[196px]"
                  >
                    <div className="relative aspect-[9/19] overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink-800/80 p-1.5 shadow-card">
                      <span className="absolute left-1/2 top-2.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink-950/70" />
                      <div className="h-full w-full overflow-hidden rounded-[1.4rem] bg-ink-950">
                        <img
                          src={shot.src}
                          alt={shot.caption ?? `${project.title} screenshot ${index + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    {shot.caption && (
                      <figcaption className="mt-2 text-center font-mono text-[10px] text-slate-500">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-200/80">Overview</p>
                <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-slate-400">
                  {(project.overview ?? [project.description]).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {project.features?.length > 0 && (
                  <div className="mt-8">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-200/80">
                      What it does
                    </p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature.title} className="glass-card p-4">
                          <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
                            <FiCheck className="h-3.5 w-3.5 shrink-0 text-brand-300" />
                            {feature.title}
                          </span>
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{feature.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">Tech stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[10.5px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.platforms?.length > 0 && (
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">Platforms</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="rounded-lg border border-brand-400/25 bg-brand-400/10 px-2.5 py-1 font-mono text-[10.5px] text-brand-200"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.highlights?.length > 0 && (
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">Highlights</p>
                    <ul className="mt-3 space-y-2">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12.5px] text-slate-400">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {links.length > 0 && (
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-500">Links</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group/link inline-flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-[13px] font-medium text-slate-200 transition-colors duration-300 hover:border-brand-400/50 hover:text-white"
                        >
                          <span className="flex items-center gap-2">
                            <FiExternalLink className="h-3.5 w-3.5 text-brand-300" />
                            {link.label}
                          </span>
                          <FiArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
