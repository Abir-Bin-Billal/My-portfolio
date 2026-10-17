import { motion } from 'framer-motion'

export default function SectionHeading({ index, eyebrow, title, highlight, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignment}`}>
      {(index || eyebrow) && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {index && <span className="text-brand-400/70">{index}</span>}
          <span className="h-1 w-1 rounded-full bg-brand-400/80" />
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </motion.h2>

      {description && (
        <motion.p
          className="max-w-2xl text-[15px] leading-relaxed text-slate-400 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.14 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
