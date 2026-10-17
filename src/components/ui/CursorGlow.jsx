import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine } from '../../hooks/usePortfolio'

export default function CursorGlow() {
  const fine = usePointerFine()
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.35 })

  useEffect(() => {
    if (!fine) return

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target
      setHovering(
        Boolean(target?.closest?.('a, button, [data-cursor="hover"], input, textarea, [role="button"]')),
      )
    }

    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [fine, x, y])

  if (!fine) return null

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.85 : 0.6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="h-8 w-8 rounded-full border border-brand-300/70 bg-brand-400/10 backdrop-blur-[1px]"
        />
      </motion.div>

      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[69] hidden lg:block"
        aria-hidden="true"
      >
        <div className="h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.09),transparent_65%)]" />
      </motion.div>
    </>
  )
}
