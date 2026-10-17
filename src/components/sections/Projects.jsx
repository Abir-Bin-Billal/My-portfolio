import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import { TechIcon } from '../Icons'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'

const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Selected work"
            title="Projects I'm proud to"
            highlight="have built"
            description="A mix of native iOS and cross-platform apps — finance, chat, and social impact."
          />

          <Reveal direction="left" className="shrink-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = filter === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={`relative rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                      isActive
                        ? 'border-brand-400/45 text-white'
                        : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 rounded-full bg-brand-400/15"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return (
    <TiltCard className="h-full rounded-3xl" intensity={6}>
      <article className="glass-card group relative flex h-full flex-col overflow-hidden rounded-3xl">
        <div
          className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.accent} opacity-[0.14] transition-opacity duration-500 group-hover:opacity-[0.24] sm:h-52`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-ink-900/70 backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
            >
              <TechIcon name={project.icon} className="h-7 w-7 text-white" />
            </motion.span>
          </div>

          <span className="absolute left-5 top-5 rounded-full border border-white/12 bg-ink-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 backdrop-blur-md">
            {project.category}
          </span>
          <span className="absolute right-5 top-5 font-mono text-[11px] text-slate-400/90">{project.year}</span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-200">
            {project.title}
          </h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{project.blurb}</p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                <span className="h-1 w-1 rounded-full bg-brand-400/70" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-5">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[10.5px] text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  )
}
