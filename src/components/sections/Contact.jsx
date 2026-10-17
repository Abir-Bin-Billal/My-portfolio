import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { TechIcon, FiCheck, FiCopy, FiMail, FiMapPin, FiPhone, FiSend } from '../Icons'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Magnetic from '../ui/Magnetic'

const contactCards = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'mail', copyable: true },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}`, icon: 'phone', copyable: true },
  {
    label: 'Location',
    value: profile.location,
    href: 'https://maps.google.com/?q=Dhaka,Bangladesh',
    icon: 'globe',
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const copy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`New project enquiry from ${form.name || 'your portfolio'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 2600)
  }

  const field =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors duration-300 focus:border-brand-400/55 focus:bg-brand-400/[0.05]'

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Get in touch"
          title="Let's build something"
          highlight="worth shipping"
          description="I'm always open to discussing exciting projects and new opportunities. Send me a message and I'll get back to you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="space-y-4">
            {contactCards.map((card, index) => (
              <Reveal key={card.label} direction="right" delay={index * 0.08}>
                <div className="glass-card group flex items-center gap-4 p-5 transition-colors duration-500 hover:border-brand-400/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-brand-400/35 group-hover:bg-brand-400/10">
                    <TechIcon name={card.icon} className="h-5 w-5 text-brand-300" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
                    <a
                      href={card.href}
                      target={card.label === 'Location' ? '_blank' : undefined}
                      rel="noreferrer"
                      className="mt-1 block truncate text-sm font-medium text-slate-200 transition-colors duration-300 hover:text-brand-300"
                    >
                      {card.value}
                    </a>
                  </div>
                  {card.copyable && (
                    <button
                      type="button"
                      onClick={() => copy(card.value, card.label)}
                      aria-label={`Copy ${card.label}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-500 transition-colors duration-300 hover:border-brand-400/40 hover:text-brand-300"
                    >
                      {copied === card.label ? (
                        <FiCheck className="h-3.5 w-3.5 text-mint" />
                      ) : (
                        <FiCopy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal direction="right" delay={0.26}>
              <div className="glass-card relative overflow-hidden p-6">
                <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-violet-glow/15 blur-3xl" />
                <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Elsewhere
                </p>
                <div className="relative mt-4 grid grid-cols-2 gap-2.5">
                  {profile.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.download ? undefined : '_blank'}
                      rel={social.download ? undefined : 'noreferrer'}
                      download={social.download}
                      className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-[12.5px] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:text-white"
                    >
                      <TechIcon name={social.icon} className="h-4 w-4 shrink-0 text-brand-300/90" />
                      <span className="truncate">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card relative overflow-hidden p-6 sm:p-8">
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-brand-500/12 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <FiSend className="h-4 w-4 text-brand-300" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight text-white">Send a message</h3>
                  <p className="font-mono text-[10.5px] text-slate-500">Replies within a day or two</p>
                </div>
              </div>

              <div className="relative mt-7 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Your name
                  </span>
                  <input
                    className={field}
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    Email
                  </span>
                  <input
                    className={field}
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </label>
              </div>

              <label className="relative mt-4 block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Project details
                </span>
                <textarea
                  className={`${field} min-h-[140px] resize-none`}
                  placeholder="Tell me about the app you want to build…"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  required
                />
              </label>

              <div className="relative mt-6 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn-primary group">
                    {sent ? 'Opening mail client…' : 'Send message'}
                    <FiSend className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </Magnetic>

                <a
                  href={profile.resume}
                  download={profile.resumeFileName}
                  className="link-underline text-[13px] font-medium text-slate-400 transition-colors duration-300 hover:text-brand-300"
                >
                  or grab my resume
                </a>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative mt-4 text-[12.5px] text-mint"
                  >
                    Your mail client should be opening with the message ready to send.
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="relative mt-6 flex items-center gap-2 font-mono text-[10.5px] text-slate-600">
                <FiMail className="h-3 w-3" />
                {profile.email}
                <span className="text-slate-700">·</span>
                <FiPhone className="h-3 w-3" />
                {profile.phone}
                <span className="hidden text-slate-700 sm:inline">·</span>
                <FiMapPin className="hidden h-3 w-3 sm:inline" />
                <span className="hidden sm:inline">{profile.location}</span>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
