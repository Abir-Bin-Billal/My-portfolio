import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine } from '../../hooks/usePortfolio'

export default function TiltCard({ children, className, intensity = 9, glare = true }) {
  const ref = useRef(null)
  const fine = usePointerFine()
  const [active, setActive] = useState(false)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 55%)`

  const handleMove = (event) => {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * intensity * 2)
    rotateX.set((0.5 - py) * intensity * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    setActive(false)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={reset}
      data-active={active}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`gradient-border group/card relative ${className ?? ''}`}
    >
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
      {children}
    </motion.div>
  )
}
