import { useEffect, useRef } from 'react'

const PARTICLE_DENSITY = 0.000075
const MAX_PARTICLES = 90
const LINK_DISTANCE = 140

export default function AuroraBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let particles = []
    let frame
    let running = true
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(MAX_PARTICLES, Math.max(28, Math.floor(width * height * PARTICLE_DENSITY)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.7,
        hue: Math.random() > 0.5 ? '56,189,248' : '124,92,255',
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
        }
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue},0.55)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(96,165,250,${(1 - dist / LINK_DISTANCE) * 0.16})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }

        const pd = Math.hypot(particles[i].x - pointer.x, particles[i].y - pointer.y)
        if (pd < 170) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.strokeStyle = `rgba(124,92,255,${(1 - pd / 170) * 0.35})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      if (running) frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    const onVisibility = () => {
      running = !document.hidden
      if (running) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_35%,transparent_100%)]" />

      <div className="absolute -left-40 top-[-10%] h-[34rem] w-[34rem] animate-blob rounded-full bg-brand-500/25 blur-[130px]" />
      <div className="absolute -right-32 top-[18%] h-[30rem] w-[30rem] animate-blob rounded-full bg-violet-glow/25 blur-[140px] [animation-delay:-6s]" />
      <div className="absolute bottom-[-12%] left-1/3 h-[28rem] w-[28rem] animate-blob rounded-full bg-mint/12 blur-[150px] [animation-delay:-12s]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.14),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  )
}
